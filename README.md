# cloudflare.tailscalepkgs-reverse-proxy
Use Cloudflare proxy servers in regions with high network latency to Tailscale Package servers :)

When you deploy code to a Cloudflare worker, replace your system's Tailscale software source.

```bash
curl -fsSL https://tailscale.com/install.sh | bash
sudo sed -i 's|pkgs.tailscale.com|cloudflareworkerdomain.dev|g' /etc/apt/sources.list.d/tailscale.list
```

custom `cloudflareworkerdomain.dev` yourself.
