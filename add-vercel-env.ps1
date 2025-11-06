# Add all environment variables to Vercel
Write-Host "Adding environment variables to Vercel..." -ForegroundColor Cyan

# Gemini API Keys
vercel env add GEMINI_KEY_2 production <<< "AIzaSyCbaralhVno9O34__9QoJGQP7VEMCZ2QMM"
vercel env add GEMINI_KEY_3 production <<< "AIzaSyBo28yHtB4_ZbWO77hqUAY92G8Ih0Dff2Y"
vercel env add GEMINI_KEY_4 production <<< "AIzaSyAxG9F4oGZ38LRqmxtEm23jCS2SaE0U67w"
vercel env add GEMINI_KEY_5 production <<< "AIzaSyBs-fUKnqSMbQvahwSu1yr1K6bs97c6Czs"
vercel env add GEMINI_KEY_6 production <<< "AIzaSyBUFwu4xLaNI5j7cgiuYdlRF1Wo7kWpFoc"
vercel env add GEMINI_KEY_7 production <<< "AIzaSyDTXity-Jye84TC_IdhboTZvHDntM-WbBU"
vercel env add GEMINI_KEY_8 production <<< "AIzaSyDC09fD-74frQo5FyN3S0jfnqUOQabBmRc"
vercel env add GEMINI_KEY_9 production <<< "AIzaSyDExFrivcYjSrjmrSbMOKBikZeg-vSHY8A"
vercel env add GEMINI_KEY_10 production <<< "AIzaSyD8R9IuXY8owvd6dGC4OmNiSkbr1rrIpgM"

# Email Configuration
vercel env add EMAIL_SERVICE production <<< "brevo"
vercel env add EMAIL_HOST production <<< "smtp-relay.brevo.com"
vercel env add EMAIL_PORT production <<< "587"
vercel env add EMAIL_USER production <<< "9ab905001@smtp-brevo.com"
vercel env add EMAIL_PASSWORD production <<< "XWdBcJUKws2PpTYE"
vercel env add ALERT_EMAIL_FROM production <<< "mechconect18@gmail.com"
vercel env add ALERT_EMAIL_TO production <<< "godbhargav@gmail.com"

# Server Configuration
vercel env add NODE_ENV production <<< "production"
vercel env add GEMINI_MODEL production <<< "gemini-2.5-flash"

Write-Host "`nAll environment variables added!" -ForegroundColor Green
Write-Host "Redeploying to apply changes..." -ForegroundColor Cyan
