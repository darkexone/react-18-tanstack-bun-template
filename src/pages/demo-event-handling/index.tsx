import { Box } from "@mui/material";

const FRAME_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Legacy MVC Button</title>
    <style>
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: radial-gradient(circle at top, #202020, #050505 70%);
        font-family: 'Courier New', monospace;
        color: #f0f0f0;
        flex-direction: column;
        gap: 1rem;
      }
      button {
        padding: 0.75rem 3rem;
        font-size: 1rem;
        letter-spacing: 0.25rem;
        text-transform: uppercase;
        border-radius: 999px;
        border: none;
        background: linear-gradient(180deg, #f0f0f0, #cfcfcf);
        color: #111;
        cursor: pointer;
      }
      .user-info {
        padding: 0.75rem 1.5rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 999px;
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.3rem;
        background: rgba(0, 0, 0, 0.4);
      }
    </style>
  </head>
  <body>
    <div class="user-info" aria-live="polite">User info hidden</div>
    <button id="legacy-toggle">Toggle profile</button>
    <script>
      const userInfo = document.querySelector('.user-info');
      const button = document.getElementById('legacy-toggle');
      let visible = false;

      const toggleUserInfo = () => {
        visible = !visible;
        if (userInfo) {
          userInfo.textContent = visible ? 'User info visible' : 'User info hidden';
        }
        window.parent?.dispatchEvent(
          new CustomEvent('legacy:toggle-user-info', {
            detail: {
              visible,
              timestamp: new Date().toISOString(),
            },
          }),
        );
      };

      if (button) {
        button.addEventListener('click', toggleUserInfo);
      }
    </script>
  </body>
</html>`;

export default function EventHandlingPage() {
	return (
		<Box sx={{ minHeight: "100vh", backgroundColor: "#050505" }}>
			<Box
				component="iframe"
				srcDoc={FRAME_HTML}
				title="Legacy MVC iframe"
				sx={{
					width: "100%",
					height: "100vh",
					border: 0,
				}}
			/>
		</Box>
	);
}
