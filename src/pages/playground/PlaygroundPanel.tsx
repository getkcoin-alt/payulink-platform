import React, { useState } from 'react';
import { 
  Code2, 
  Play, 
  Copy, 
  CheckCircle2, 
  Terminal, 
  Key, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';

export const PlaygroundPanel: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<'create_order' | 'check_status' | 'bridge_orders' | 'webhook_sim'>('create_order');
  const [selectedLang, setSelectedLang] = useState<'curl' | 'node' | 'python'>('curl');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>({
    status: 200,
    time: '42ms',
    body: {
      code: 0,
      msg: 'success',
      data: {
        orderId: 'ORD_PL_2026_9941',
        amount: 5000,
        currency: 'INR',
        checkoutUrl: 'https://payulink-platform.vercel.app/pay/DEMO-LINK-101',
        qrData: 'upi://pay?pa=payulink.pool88@icici&pn=PayuLink&am=5000.00&cu=INR',
        tokenRate: 1.0,
        expiresAt: '2026-09-10T22:15:00Z'
      }
    }
  });

  const endpoints = [
    {
      id: 'create_order',
      method: 'POST',
      path: '/api/v1/order/create',
      name: 'Create Dynamic UPI Order',
      desc: 'Generates instant dynamic QR checkout session with real-time pool matching'
    },
    {
      id: 'check_status',
      method: 'GET',
      path: '/api/v1/order/status/:orderId',
      name: 'Query Order & UTR Status',
      desc: 'Retrieves payment confirmation state, UTR number and settlement status'
    },
    {
      id: 'bridge_orders',
      method: 'GET',
      path: '/api/merchant/bridge/sub-orders',
      name: 'List Bridge Sub-Orders',
      desc: 'Fetches active chunked sub-orders available for merchant payout fulfillment'
    },
    {
      id: 'webhook_sim',
      method: 'POST',
      path: '/api/v1/webhook/simulate',
      name: 'HMAC-SHA256 Webhook Simulator',
      desc: 'Simulates payment event notification and verifies cryptographic signature'
    }
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunRequest = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      if (selectedEndpoint === 'create_order') {
        setApiResponse({
          status: 200,
          time: '38ms',
          body: {
            code: 0,
            msg: 'success',
            data: {
              orderId: `ORD_PL_${Date.now().toString().slice(-6)}`,
              amount: 5000,
              currency: 'INR',
              checkoutUrl: 'https://payulink-platform.vercel.app/pay/DEMO-LINK-101',
              qrData: 'upi://pay?pa=payulink.pool88@icici&pn=PayuLink&am=5000.00&cu=INR',
              tokenRate: 1.0,
              expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString()
            }
          }
        });
      } else if (selectedEndpoint === 'check_status') {
        setApiResponse({
          status: 200,
          time: '24ms',
          body: {
            code: 0,
            msg: 'success',
            data: {
              orderId: 'ORD-PL-100293',
              status: 'CONFIRMED',
              amount: 101,
              utrNumber: '625410982343',
              merchantCode: 'M-FD055F93',
              confirmedAt: '2026-09-10T20:15:30Z'
            }
          }
        });
      } else if (selectedEndpoint === 'bridge_orders') {
        setApiResponse({
          status: 200,
          time: '45ms',
          body: {
            code: 0,
            msg: 'success',
            data: {
              total: 3,
              orders: [
                { chunkId: 'CHK-901', orderNo: 'ORD-7729-A', amount: 500, vpa: 'user.payout@okhdfc', status: 'CLAIMED' },
                { chunkId: 'CHK-902', orderNo: 'ORD-7729-B', amount: 1500, vpa: 'user.payout@icici', status: 'PROCESSING' }
              ]
            }
          }
        });
      } else {
        setApiResponse({
          status: 200,
          time: '19ms',
          body: {
            code: 0,
            msg: 'Webhook delivered and verified successfully',
            signature: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
            verified: true
          }
        });
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#050510] text-gray-100 flex flex-col font-sans selection:bg-orange-500/30">
      <Navbar />

      {/* Header Bar */}
      <header className="border-b border-white/5 bg-[#090918]/80 backdrop-blur-md px-6 py-5 sticky top-14 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white">Developer API Sandbox</h1>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  SANDBOX v2.4
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Interactive API request builder, signature test harnesses & live response inspector
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#121226] px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2 text-xs">
              <Key className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-gray-400">Merchant API Key:</span>
              <span className="font-mono text-white">sec_live_99f0...882a</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Endpoint Selector */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1">
            API Endpoints
          </h3>
          <div className="space-y-2">
            {endpoints.map(ep => (
              <button
                key={ep.id}
                onClick={() => setSelectedEndpoint(ep.id as any)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                  selectedEndpoint === ep.id
                    ? 'bg-[#12122b] border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                    : 'bg-[#0b0b1c] border-white/5 hover:border-white/10 text-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    ep.method === 'POST' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {ep.method}
                  </span>
                  <span className="font-mono text-xs font-bold text-white">{ep.path}</span>
                </div>
                <div className="text-xs font-semibold text-gray-200 mt-2">{ep.name}</div>
                <div className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">{ep.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Request & Response Playground */}
        <div className="lg:col-span-8 space-y-5">
          {/* Request Header & Trigger */}
          <div className="bg-[#0b0b1c] border border-white/10 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                  {selectedEndpoint === 'check_status' || selectedEndpoint === 'bridge_orders' ? 'GET' : 'POST'}
                </span>
                <span className="font-mono text-sm font-bold text-white">
                  https://api.payulink.io
                  {endpoints.find(e => e.id === selectedEndpoint)?.path}
                </span>
              </div>

              <button
                onClick={handleRunRequest}
                disabled={isRunning}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-600/30 flex items-center gap-1.5 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {isRunning ? 'Sending...' : 'Send Request'}
              </button>
            </div>

            {/* Language Switcher for Snippets */}
            <div className="flex items-center justify-between border-t border-white/5 pt-3">
              <div className="flex items-center gap-1">
                {(['curl', 'node', 'python'] as const).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLang(lang)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium uppercase transition-all ${
                      selectedLang === lang ? 'bg-white/10 text-cyan-300 font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleCopy('curl -X POST https://api.payulink.io/api/v1/order/create')}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" />
                {copied ? 'Copied' : 'Copy Code'}
              </button>
            </div>

            {/* Code Block */}
            <div className="bg-[#12122b] p-3.5 rounded-xl font-mono text-xs text-gray-300 overflow-x-auto border border-white/5">
              {selectedLang === 'curl' && (
                <pre>{`curl -X POST https://api.payulink.io/api/v1/order/create \\
  -H "Authorization: Bearer sec_live_99f0...882a" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 5000,
    "currency": "INR",
    "customerVpa": "customer@upi",
    "notifyUrl": "https://yourdomain.com/webhook"
  }'`}</pre>
              )}
              {selectedLang === 'node' && (
                <pre>{`const response = await fetch('https://api.payulink.io/api/v1/order/create', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sec_live_99f0...882a',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    amount: 5000,
    currency: 'INR'
  })
});
const data = await response.json();`}</pre>
              )}
              {selectedLang === 'python' && (
                <pre>{`import requests

url = "https://api.payulink.io/api/v1/order/create"
headers = {"Authorization": "Bearer sec_live_99f0...882a"}
payload = {"amount": 5000, "currency": "INR"}

resp = requests.post(url, json=payload, headers=headers)
print(resp.json())`}</pre>
              )}
            </div>
          </div>

          {/* Response Console */}
          <div className="bg-[#0b0b1c] border border-white/10 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Live Response
              </span>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                  {apiResponse.status} OK
                </span>
                <span className="text-gray-400">{apiResponse.time}</span>
              </div>
            </div>

            <div className="bg-[#12122b] p-4 rounded-xl font-mono text-xs text-emerald-400/90 overflow-x-auto border border-white/5 max-h-72">
              <pre>{JSON.stringify(apiResponse.body, null, 2)}</pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
