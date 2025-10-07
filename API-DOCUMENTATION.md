# 🤖 TENNET-MD Bot API Documentation

## Base URL
```
https://tennet-md.pxxl.click
```

## Available Endpoints

### 1. Health Check
**GET** `/api/health`

Check if the bot is online and running.

**Response:**
```json
{
  "status": "online",
  "bot": "TENNET-MD",
  "version": "1.0.0",
  "timestamp": "2025-01-06T19:57:42.000Z"
}
```

### 2. Bot Information
**GET** `/api/info`

Get complete bot information and contact details.

**Response:**
```json
{
  "bot_name": "TENNET-MD",
  "owner": "2348124269148",
  "telegram": "@drainer_lord",
  "channel": "@tennetmdbot",
  "youtube": "@tennetmdbot",
  "whatsapp_group": "https://chat.whatsapp.com/F5tRABjVmhvGLGww7Gk0aV",
  "whatsapp_channel": "https://whatsapp.com/channel/0029VbBBlBZ5PO13rTZcKk14",
  "brand_image": "https://www.tennetteam.com/assets/images/slider/Brand%20icon.png",
  "newsletter_id": "120363419286840338@newsletter"
}
```

### 3. Generate Pairing Code (Detailed)
**GET** `/api/pairing-code?number=PHONE_NUMBER`

Generate a WhatsApp pairing code for a phone number with detailed response.

**Parameters:**
- `number` (required): WhatsApp phone number without + (e.g., 2347078379027)

**Response:**
```json
{
  "success": true,
  "code": "H23Q-EKKE",
  "number": "2347078379027",
  "message": "Pairing code generated successfully",
  "timestamp": "2025-01-07T04:00:00.000Z"
}
```

**Live Example:**
```
https://tennet-md.pxxl.click/api/pairing-code?number=2347078379027
```

### 4. Generate Pairing Code (Simple)
**GET** `/api/code?number=PHONE_NUMBER`

Generate a WhatsApp pairing code with simple response format.

**Parameters:**
- `number` (required): WhatsApp phone number without + (e.g., 2347078379027)

**Response:**
```json
{
  "code": "H23Q-EKKE"
}
```

**Live Example:**
```
https://tennet-md.pxxl.click/api/code?number=2347078379027
```

**Error Response:**
```json
{
  "error": "Phone number is required"
}
```

### 4. Pairing Interface
**GET** `/pair`

Access the web-based pairing interface.

**Response:** HTML page for pairing

### 5. Direct Code Generation
**GET** `/code?number=PHONE_NUMBER`

Direct pairing code generation (existing endpoint).

**Parameters:**
- `number` (required): WhatsApp phone number without +

**Response:**
```json
{
  "code": "ABCD-EFGH"
}
```

## Integration Examples

### JavaScript/Fetch
```javascript
// Check bot health
const health = await fetch('https://tennet-md.pxxl.click/api/health');
const healthData = await health.json();
console.log(healthData);

// Get bot info
const info = await fetch('https://tennet-md.pxxl.click/api/info');
const infoData = await info.json();
console.log(infoData);

// Generate pairing code (detailed response)
const code = await fetch('https://tennet-md.pxxl.click/api/pairing-code?number=2347078379027');
const codeData = await code.json();
console.log(codeData.code); // "H23Q-EKKE"

// Generate pairing code (simple response)
const simpleCode = await fetch('https://tennet-md.pxxl.click/api/code?number=2347078379027');
const simpleCodeData = await simpleCode.json();
console.log(simpleCodeData.code); // "H23Q-EKKE"
```

### PHP/cURL
```php
<?php
// Check bot health
$health = file_get_contents('https://tennet-md.pxxl.click/api/health');
$healthData = json_decode($health, true);

// Get bot info
$info = file_get_contents('https://tennet-md.pxxl.click/api/info');
$infoData = json_decode($info, true);

// Generate pairing code (simple)
$code = file_get_contents('https://tennet-md.pxxl.click/api/code?number=2347078379027');
$codeData = json_decode($code, true);
echo $codeData['code']; // "H23Q-EKKE"

// Generate pairing code (detailed)
$detailedCode = file_get_contents('https://tennet-md.pxxl.click/api/pairing-code?number=2347078379027');
$detailedCodeData = json_decode($detailedCode, true);
echo $detailedCodeData['code']; // "H23Q-EKKE"
?>
```

### Python/Requests
```python
import requests

# Check bot health
health = requests.get('https://tennet-md.pxxl.click/api/health')
health_data = health.json()

# Get bot info
info = requests.get('https://tennet-md.pxxl.click/api/info')
info_data = info.json()

# Generate pairing code
code = requests.get('https://tennet-md.pxxl.click/api/pairing-code?number=2348124269148')
code_data = code.json()
```

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200` - Success
- `400` - Bad Request (missing parameters)
- `500` - Internal Server Error

## Rate Limiting

Currently no rate limiting is implemented. Use responsibly.

## CORS

CORS is enabled for all origins. You can integrate from any domain.

## Support

For API support or questions:
- **Telegram**: [@drainer_lord](https://t.me/drainer_lord)
- **Phone**: +2348124269148

---

**Made with ❤️ by TENNET-MD**
