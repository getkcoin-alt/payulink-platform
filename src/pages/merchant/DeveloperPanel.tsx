import React, { useState } from 'react';
import { 
  Key, 
  Code2, 
  Settings, 
  FileCode2, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  Download, 
  Send, 
  CheckCircle2, 
  Play,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const DeveloperPanel: React.FC<{ initialTab?: 'credentials' | 'webhooks' | 'playground' | 'docs' }> = ({
  initialTab = 'credentials'
}) => {
  const { currentMerchant, updateMerchant } = useAuth();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showSecret, setShowSecret] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Webhook form
  const [webhookUrl, setWebhookUrl] = useState(currentMerchant.webhookUrl || 'https://api.deltapay.io/v1/payulink-webhook');
  const [webhookTestStatus, setWebhookTestStatus] = useState<'idle' | 'testing' | 'success'>('idle');

  // Playground simulation
  const [pgMethod, setPgMethod] = useState<'POST_PAYOUT' | 'POST_PAYIN'>('POST_PAYOUT');
  const [pgResponse, setPgResponse] = useState<string | null>(null);

  const copyToClipboard = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRotateSecret = () => {
    if (confirm('Are you sure you want to rotate your API Secret? Any active backend using the previous secret will immediately fail until updated.')) {
      const newSecret = `mock_sk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
      updateMerchant({ apiSecret: newSecret });
      alert('New API Secret generated.');
    }
  };

  const handleTestWebhook = () => {
    setWebhookTestStatus('testing');
    setTimeout(() => {
      setWebhookTestStatus('success');
      setTimeout(() => setWebhookTestStatus('idle'), 3000);
    }, 1200);
  };

  const runPlayground = () => {
    if (pgMethod === 'POST_PAYOUT') {
      setPgResponse(JSON.stringify({
        code: 200,
        status: "SUCCESS",
        message: "Payout order dispatched to bank IMPS network",
        data: {
          merchantOrderNo: "TEST_ORD_88219",
          orderRef: "REF_PLAYGROUND_01",
          amount: 5000.00,
          currency: "INR",
          fee: 5.00,
          beneficiary: "Aarav Sharma (aarav@okaxis)",
          utr: "625399182736",
          status: "COMPLETED",
          timestamp: new Date().toISOString()
        }
      }, null, 2));
    } else {
      setPgResponse(JSON.stringify({
        code: 200,
        status: "SUCCESS",
        message: "Collection intent initialized",
        data: {
          merchantOrderNo: "TEST_REC_44120",
          amount: 2500.00,
          currency: "INR",
          vpa: "payu.deltapay@icici",
          qrPayload: "upi://pay?pa=payu.deltapay@icici&pn=DeltaPay&am=2500.00&tr=TEST_REC_44120",
          expirySeconds: 900,
          status: "PENDING",
          timestamp: new Date().toISOString()
        }
      }, null, 2));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold font-display text-bp-text">Developer & API Center</h1>
          <p className="text-xs text-bp-muted mt-0.5">
            Integrate PayuLink REST APIs, configure webhooks, bind Telegram alerts, and test in sandbox mode.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-bp-card border border-bp-border">
          <button
            onClick={() => setActiveTab('credentials')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'credentials' 
                ? 'bg-bp-accent text-white shadow-md' 
                : 'text-bp-muted hover:text-bp-text'
            }`}
          >
            API Keys
          </button>
          <button
            onClick={() => setActiveTab('playground')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'playground' 
                ? 'bg-bp-accent text-white shadow-md' 
                : 'text-bp-muted hover:text-bp-text'
            }`}
          >
            API Playground
          </button>
          <button
            onClick={() => setActiveTab('webhooks')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'webhooks' 
                ? 'bg-bp-accent text-white shadow-md' 
                : 'text-bp-muted hover:text-bp-text'
            }`}
          >
            Webhooks & Bot
          </button>
        </div>
      </div>

      {/* Tab 1: API Keys */}
      {activeTab === 'credentials' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-bp-card border border-bp-border space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-sm text-bp-text flex items-center gap-2">
                  <Key className="w-4 h-4 text-bp-accent" />
                  Production API Credentials
                </h2>
                <p className="text-xs text-bp-muted mt-0.5">
                  Use these credentials to authenticate server-to-server requests using headers <code className="font-mono text-bp-accent">X-API-Key</code> and <code className="font-mono text-bp-accent">X-API-Secret</code>.
                </p>
              </div>

              <button
                onClick={handleRotateSecret}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-medium transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Rotate Secret
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-bp-muted block mb-1 font-medium">Merchant Public API Key</label>
                <div className="flex items-center justify-between p-3 rounded-xl bg-bp-input border border-bp-border font-mono text-bp-text">
                  <span className="truncate">{currentMerchant.apiKey}</span>
                  <button
                    onClick={() => copyToClipboard(currentMerchant.apiKey, 'apiKey')}
                    className="p-1 hover:text-bp-accent transition-colors"
                  >
                    {copiedKey === 'apiKey' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-bp-muted" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-bp-muted block mb-1 font-medium">Merchant API Secret</label>
                <div className="flex items-center justify-between p-3 rounded-xl bg-bp-input border border-bp-border font-mono text-bp-text">
                  <span className="truncate">
                    {showSecret ? currentMerchant.apiSecret : '••••••••••••••••••••••••••••••••••••••••'}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowSecret(!showSecret)}
                      className="p-1 hover:text-bp-text text-bp-muted transition-colors"
                      title={showSecret ? 'Hide secret' : 'Show secret'}
                    >
                      {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => copyToClipboard(currentMerchant.apiSecret, 'apiSecret')}
                      className="p-1 hover:text-bp-accent transition-colors"
                      title="Copy Secret"
                    >
                      {copiedKey === 'apiSecret' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-bp-muted" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-bp-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-semibold text-bp-text block">Official Postman Collection</span>
                <span className="text-bp-muted">Download pre-configured JSON collection with complete endpoints & samples.</span>
              </div>
              <button 
                onClick={() => alert('Downloading PayuLink Postman Collection JSON...')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-bp-input border border-bp-border hover:bg-white/[0.08] text-bp-text font-medium transition-all shrink-0"
              >
                <Download className="w-3.5 h-3.5 text-purple-400" />
                Download Postman JSON
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Playground */}
      {activeTab === 'playground' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-bp-card border border-bp-border space-y-4">
            <h2 className="font-semibold text-sm text-bp-text flex items-center gap-2">
              <Code2 className="w-4 h-4 text-bp-accent" />
              Simulate API Request
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-bp-muted block mb-1">Select Endpoint</label>
                <select
                  value={pgMethod}
                  onChange={(e) => setPgMethod(e.target.value as any)}
                  className="w-full bg-bp-input border border-bp-border text-bp-text rounded-xl px-3 py-2 focus:outline-none"
                >
                  <option value="POST_PAYOUT">POST /api/v1/payouts (Disburse Funds)</option>
                  <option value="POST_PAYIN">POST /api/v1/receive (Create Dynamic UPI)</option>
                </select>
              </div>

              <div>
                <label className="text-bp-muted block mb-1">Payload (JSON)</label>
                <div className="p-3 rounded-xl bg-bp-input border border-bp-border font-mono text-[11px] text-bp-muted">
                  {pgMethod === 'POST_PAYOUT' ? (
`{
  "merchantOrderNo": "ORD_TEST_991",
  "amount": 5000,
  "transferMethod": "UPI",
  "beneficiaryName": "Aarav Sharma",
  "upiId": "aarav@okaxis"
}`
                  ) : (
`{
  "merchantOrderNo": "REC_TEST_441",
  "amount": 2500,
  "customerName": "Kavita Verma",
  "paymentMethod": "UPI"
}`
                  )}
                </div>
              </div>

              <button
                onClick={runPlayground}
                className="w-full py-2.5 rounded-xl bg-bp-accent text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 hover:bg-bp-accent-hover transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                Execute Test Call
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-bp-card border border-bp-border space-y-3">
            <h3 className="font-semibold text-sm text-bp-text">API Response Output</h3>
            <div className="h-80 overflow-auto p-4 rounded-xl bg-black/40 border border-bp-border font-mono text-[11px] text-emerald-400">
              {pgResponse ? (
                <pre>{pgResponse}</pre>
              ) : (
                <span className="text-bp-muted">Click "Execute Test Call" to send a sandbox request.</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Webhooks & Bot */}
      {activeTab === 'webhooks' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-bp-card border border-bp-border space-y-4">
            <h2 className="font-semibold text-sm text-bp-text flex items-center gap-2">
              <Settings className="w-4 h-4 text-bp-accent" />
              Webhook Notifications
            </h2>
            <p className="text-xs text-bp-muted">
              PayuLink will dispatch real-time HMAC-SHA256 signed JSON payloads to your server whenever order states change.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-bp-muted block mb-1">Webhook Endpoint URL</label>
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full bg-bp-input border border-bp-border rounded-xl px-3 py-2 text-bp-text font-mono focus:outline-none focus:border-bp-accent"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    updateMerchant({ webhookUrl });
                    alert('Webhook configuration saved!');
                  }}
                  className="px-4 py-2 rounded-xl bg-bp-accent text-white font-semibold hover:bg-bp-accent-hover transition-all shadow-md"
                >
                  Save Webhook
                </button>
                <button
                  onClick={handleTestWebhook}
                  className="px-4 py-2 rounded-xl bg-bp-card border border-bp-border text-bp-text hover:bg-white/[0.08] transition-all"
                >
                  {webhookTestStatus === 'testing' ? 'Testing endpoint...' : webhookTestStatus === 'success' ? 'Ping 200 OK ✓' : 'Send Test Ping'}
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-bp-card border border-bp-border space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-sky-400" />
                <h3 className="font-semibold text-sm text-bp-text">Telegram Bot Alerts (@PayULink_Bot)</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400">
                CONNECTED
              </span>
            </div>

            <p className="text-xs text-bp-muted">
              Receive high-priority payment success, failed payout alerts, and balance notifications on Telegram.
            </p>

            <div className="p-3 rounded-xl bg-bp-input border border-bp-border flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-bp-muted block">Linked Telegram ID</span>
                <span className="font-mono font-semibold text-bp-text">@deltapay_treasury (ID: 89123847)</span>
              </div>
              <button
                onClick={() => alert('Unbinding Telegram notification bot...')}
                className="text-xs text-red-400 hover:underline"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
