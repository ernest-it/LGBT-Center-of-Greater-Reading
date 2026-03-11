export async function GET() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Donate</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: transparent; }
    #fallback {
      display: none;
      text-align: center;
      padding: 2rem;
      color: #555;
      font-size: 0.95rem;
      line-height: 1.6;
    }
    #fallback a { color: #6366f1; text-decoration: none; }
    #fallback a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div id="fallback">
    <p>The donation form is unavailable in this environment.</p>
    <p>It will load automatically when the site is deployed to production.</p>
    <p style="margin-top: 1rem;">
      You can donate directly at
      <a href="https://www.lgbtcenterofreading.com/donate" target="_blank" rel="noopener noreferrer">lgbtcenterofreading.com/donate</a>
    </p>
  </div>
  <script type="text/javascript" src="https://api.silentpartnersoftware.com/forms/v1/forms/bf17148f-7593-41e6-b4ef-17bf4fbf0e78/js"><\/script>
  <script>
    // Show fallback if the donation form fails to load after 5 seconds
    setTimeout(function() {
      var forms = document.querySelectorAll('form, iframe, [class*="sps"], [id*="sps"]');
      if (forms.length === 0) {
        document.getElementById('fallback').style.display = 'block';
      }
    }, 5000);
  <\/script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
      'X-Frame-Options': 'SAMEORIGIN',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://api.silentpartnersoftware.com; style-src 'self' 'unsafe-inline' https://api.silentpartnersoftware.com; img-src 'self' data: https://api.silentpartnersoftware.com *; font-src 'self' data: https://api.silentpartnersoftware.com; connect-src 'self' https://api.silentpartnersoftware.com; frame-src https://api.silentpartnersoftware.com;",
    },
  });
}
