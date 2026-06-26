🐾 StrayShield


A full-stack web application for reporting, tracking, and rescuing injured stray dogs — connecting citizens with NGOs across Jaipur.




📌 Overview

StrayShield is a community-driven dog welfare platform that allows citizens to report injured or distressed stray dogs. Reports are automatically pinned on a live map using geolocation. Registered NGOs can view cases, upload rescue reels, and coordinate rescue efforts — all in one place.


🚀 Live Features


📝 Report a Case — Citizens submit reports with location, severity, and case type
🗺️ Live Map — All active cases auto-pinned on Jaipur city map with color-coded severity zones
🏢 NGO Directory — Browse all registered NGOs with contact details
🎬 Rescue Reels — NGOs upload rescue videos; everyone can view
🔐 Role-based Auth — Separate flows for Citizens and NGOs
📍 Auto Geocoding — Address text → coordinates via Nominatim (no API key needed)



🛠️ Tech Stack

Frontend

TechnologyPurposeReact 19UI frameworkRedux ToolkitGlobal state managementReact Router v7Client-side routingTailwind CSSStylingAxiosHTTP requestsLeaflet.jsInteractive mapsleaflet.markerclusterCase density zone coloring

Backend

TechnologyPurposeNode.js + Express 5Server frameworkMongoDB + MongooseDatabaseJWTAuthentication tokensbcryptPassword hashingcookie-parserHTTP cookie handlingNodemonDevelopment server

External Services (All Free)

ServicePurposeMongoDB AtlasCloud database (free tier)CloudinaryVideo/image storage for reels (free tier)OpenStreetMapMap tiles (completely free, no key)NominatimGeocoding — address to coordinates (free, no key)


📁 Project Structure

StraySheild/
├── backend/
│   └── src/
│       ├── controllers/
│       │   ├── user.controller.js      # Auth logic (register, login, logout)
│       │   ├── report.controller.js    # Report CRUD + geocoding
│       │   ├── ngo.controller.js       # NGO profile management
│       │   └── reel.controller.js      # Rescue reel management
│       ├── middleware/
│       │   ├── authorized.middleware.js  # JWT verification
│       │   └── roleGuard.middleware.js   # Role-based access control
│       ├── models/
│       │   ├── user.model.js           # User schema (User/NGO roles)
│       │   ├── report.model.js         # Report schema with GeoJSON location
│       │   ├── ngoProfile.model.js     # NGO organisation details
│       │   ├── reel.model.js           # Rescue video schema
│       │   └── caseTracking.model.js   # Case status tracking
│       ├── routes/
│       │   ├── user.routes.js          # Auth routes
│       │   ├── report.routes.js        # Report routes
│       │   ├── ngo.route.js            # NGO routes
│       │   └── reel.routes.js          # Reel routes
│       ├── utils/
│       │   ├── geocode.js              # Nominatim geocoding utility
│       │   ├── asynHandler.js          # Async error wrapper
│       │   └── ApiResponse.js          # Standard response helper
│       ├── db/db.js                    # MongoDB connection
│       ├── app.js                      # Express app + middleware
│       └── index.js                    # Server entry point
│
└── frontend/
    └── src/
        ├── components/
        │   ├── header/
        │   │   ├── Header.jsx          # Role-based navigation
        │   │   └── Logoutbtn.jsx       # Logout with cookie clearing
        │   ├── Home.jsx
        │   ├── Hero.jsx
        │   ├── Login.jsx               # Login with JWT + Redux
        │   ├── Reels.jsx               # Video feed + NGO upload
        │   └── Layout.jsx              # Session restore on refresh
        ├── pages/
        │   ├── Signup.jsx              # Role-based registration
        │   ├── NgoForm.jsx             # NGO profile creation
        │   ├── MapPage.jsx             # Leaflet map with auto pins
        │   └── NgoDirectory.jsx        # NGO cards directory
        ├── protected/
        │   └── Protect.jsx             # Route protection component
        ├── features/
        │   └── slice.js                # Redux auth slice
        ├── store/
        │   └── store.js                # Redux store
        ├── Report.jsx                  # Report submission form
        └── main.jsx                    # Router + Redux provider


🔌 API Reference

Auth Routes — /api/auth

MethodEndpointAccessDescriptionPOST/registerPublicRegister User or NGOPOST/loginPublicLogin, returns JWT cookiePOST/logoutProtectedClears cookie + refresh tokenGET/meProtectedGet current user (session restore)

Report Routes — /api/reports

MethodEndpointAccessDescriptionGET/PublicGet all active reports with coordinatesPOST/ProtectedSubmit report — auto-geocodes addressGET/mineProtectedGet logged-in user's reports

NGO Routes — /api/ngo

MethodEndpointAccessDescriptionGET/PublicGet all NGO profilesPOST/NGO onlyCreate NGO profile

Reel Routes — /api/reels

MethodEndpointAccessDescriptionGET/PublicGet all rescue reelsPOST/NGO onlySave reel URL + caption


🗄️ Database Schemas

User

js{
  fullName: String,
  phoneNo: String,
  address: String,
  email: String (unique, lowercase),
  password: String (bcrypt hashed),
  role: enum['User', 'NGO'],
  refreshToken: String,
  timestamps: true
}

Report

js{
  user: ObjectId (ref: User),
  description: String,
  address: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]  // [longitude, latitude] — GeoJSON
  },
  caseType: enum['Injured', 'Sick', 'Aggressive', 'Abandoned', 'Other'],
  severity: enum['Low', 'Medium', 'High', 'Emergency'],
  contactNumber: String,
  status: enum['open', 'in_progress', 'resolved'],
  images: [String],
  timestamps: true
}
// Index: 2dsphere on location field

NGO Profile

js{
  user: ObjectId (ref: User),
  organisationName: String,
  establishedIn: String,
  address: String,
  email: String,
  directorName: String,
  contactNo: String,
  serviceIn: String,
  membersCount: Number,
  timestamps: true
}

Reel

js{
  uploadedBy: ObjectId (ref: User),
  reelURL: String,
  caption: String,
  timestamps: true
}


⚙️ Environment Variables

Create backend/.env:

envMONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net
ACCESS_TOKEN_SECRET=your_access_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRY=7d


🏃 Getting Started

Prerequisites


Node.js v18+
MongoDB Atlas account (free)
Cloudinary account (free)


Installation

1. Clone the repository

bashgit clone https://github.com/YatharthMitra02/StraySheild.git
cd StraySheild

2. Setup Backend

bashcd backend
npm install

Create backend/.env with your credentials (see Environment Variables above).

bashnpm run dev

Backend runs on http://localhost:3000

3. Setup Frontend

bashcd frontend
npm install
npm run dev

Frontend runs on http://localhost:5173


🗺️ How the Map Works


User submits a report with a text address (e.g., "Hawa Mahal, Jaipur")
Backend calls Nominatim (free OpenStreetMap geocoding) — converts address to { lat, lng }
Coordinates saved to MongoDB in GeoJSON format with a 2dsphere index
Map page fetches all reports via GET /api/reports
Leaflet.js plots a circle marker at each coordinate automatically
leaflet.markercluster groups nearby pins:

🔴 Red cluster = 10+ cases
🟡 Yellow cluster = 4–9 cases
🟢 Green cluster = 1–3 cases



Clicking any pin shows a popup with full case details


No manual pin placement. Everything is fully automatic.


🔐 Authentication Flow

Register → JWT access token (1 day) + refresh token (7 days)
         → stored in httpOnly cookie (JS cannot read it)
         → Redux stores { _id, fullName, email, role }

Page refresh → Layout.jsx calls GET /api/auth/me
             → cookie sent automatically
             → session restored silently

Logout → cookie cleared + refresh token wiped from MongoDB


👥 User Roles

FeatureCitizenNGOView map✅✅Submit report✅✅View NGO directory✅✅View reels✅✅Upload reels❌✅Create NGO profile❌✅Claim a case❌✅


🎬 Reel Upload Flow


NGO selects video file in browser
Video uploaded directly to Cloudinary (no server bandwidth used)
Cloudinary returns a secure URL
Frontend sends { reelURL, caption } to POST /api/reels
Backend saves to MongoDB with NGO's user reference
Reel appears in feed immediately



🙋 Author

Yatharth Mitra


B.Tech AI & Data Science — JECRC Foundation, Jaipur (2027)
GitHub: @YatharthMitra02



📄 License

This project is open source and available under the MIT License.
