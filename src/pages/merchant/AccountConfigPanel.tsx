import React, { useState } from 'react';
import { 
  Settings, 
  Send, 
  Webhook, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  RotateCw, 
  Radio, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AccountConfigPanel: React.FC = () => {
  const { currentMerchant, updateMerchant } = useAuth();
  const [telegramConnected, setTelegramConnected] = useState(currentMerchant.telegramBound);
  const [callbackUrl, setCallbackUrl] = useState(currentMerchant.webhookUrl || 'https://api.mazer.in/webhooks/payulink');
  const [signingVersion, setSigningVersion] = useState<'v1' | 'v2'>('v2');
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const webhookSecret = currentMerchant.webhookSecret || 'whsec_mazer_7718923a10ef';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateMerchant({ webhookUrl: callbackUrl });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold font-display text-bp-text">Configuration</h1>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
            SYSTEM SETTINGS
          </span>
        </div>
        <p className="text-xs text-bp-muted mt-0.5">
          General account-level settings, webhooks, and bot alerts.
        </p>
      </div>

      {/* Card 1: Telegram Notifications */}
      <div className="p-6 rounded-2xl bg-bp-card border border-white/[0.08] shadow-lg space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-bp-text">Telegram Notifications</h2>
              <p className="text-[11px] text-bp-muted">
                Real-time order alerts via <strong className="text-sky-400">@payulink_merchant_bot</strong>
              </p>
            </div>
          </div>

          <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
            telegramConnected 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
              : 'bg-white/[0.03] text-bp-muted border-white/[0.06]'
          }`}>
            {telegramConnected ? 'Connected' : 'Not connected'}
          </span>
        </div>

        <p className="text-xs text-bp-muted">
          Receive push notifications for payout assignments, receive-order approvals/rejections, and pool liquidity changes directly on Telegram.
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setTelegramConnected(!telegramConnected);
              updateMerchant({ telegramBound: !telegramConnected });
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs shadow-lg shadow-sky-500/20 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            {telegramConnected ? 'Disconnect Bot' : 'Connect Telegram'}
          </button>

          <a
            href="https://t.me/payulink_merchant_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-bp-muted hover:text-bp-text text-xs"
          >
            Open Bot Link
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>
      </div>

      {/* Card 2: Webhooks & Callbacks */}
      <div className="p-6 rounded-2xl bg-bp-card border border-white/[0.08] shadow-lg space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
              <Webhook className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-bp-text">Webhook Configuration</h2>
              <p className="text-[11px] text-bp-muted">Automated real-time event dispatch</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-[11px] font-mono text-bp-muted block uppercase tracking-wider mb-1.5">
              Callback URL
            </label>
            <input
              type="url"
              value={callbackUrl}
              onChange={(e) => setCallbackUrl(e.target.value)}
              placeholder="https://api.yourdomain.com/webhooks/payulink"
              className="w-full px-3.5 py-2.5 rounded-xl bg-bp-input border border-bp-border text-xs text-bp-text font-mono focus:outline-none focus:border-orange-500"
            />
            <span className="text-[11px] text-bp-muted mt-1 block">
              HTTPS endpoint where JSON notifications will be POSTed.
            </span>
          </div>

          <div>
            <label className="text-[11px] font-mono text-bp-muted block uppercase tracking-wider mb-1.5">
              Webhook Signing Algorithm
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSigningVersion('v2')}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  signingVersion === 'v2'
                    ? 'bg-orange-500/10 text-orange-400 border-orange-500/40 shadow-sm'
                    : 'bg-white/[0.02] border-white/[0.06] text-bp-muted hover:text-bp-text'
                }`}
              >
                <div className="font-bold font-mono text-bp-text">v2 (HMAC-SHA256)</div>
                <div className="text-[10px] text-bp-muted mt-0.5">Recommended · Includes replay defense timestamp</div>
              </button>

              <button
                type="button"
                onClick={() => setSigningVersion('v1')}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  signingVersion === 'v1'
                    ? 'bg-orange-500/10 text-orange-400 border-orange-500/40 shadow-sm'
                    : 'bg-white/[0.02] border-white/[0.06] text-bp-muted hover:text-bp-text'
                }`}
              >
                <div className="font-bold font-mono text-bp-text">v1 (Legacy MD5)</div>
                <div className="text-[10px] text-bp-muted mt-0.5">Basic payload hash signature</div>
              </button>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono text-bp-muted block uppercase tracking-wider mb-1.5">
              Webhook Signing Secret
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] font-mono text-xs text-bp-text truncate">
                {webhookSecret}
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(webhookSecret);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
                className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-bp-muted hover:text-bp-text"
                title="Copy Secret"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {savedSuccess ? (
              <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4" /> Webhook settings saved
              </span>
            ) : <span />}

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs shadow-lg shadow-orange-500/20 transition-all"
            >
              Save Webhook Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
