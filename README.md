<div align="center">

```
 ██████╗ █████╗███╗   ███╗██████╗ ██╗   ██╗███████╗
██╔════╝██╔══██╗████╗ ████║██╔══██╗██║   ██║██╔════╝
██║     ███████║██╔████╔██║██████╔╝██║   ██║███████╗
██║     ██╔══██║██║╚██╔╝██║██╔═══╝ ██║   ██║╚════██║
╚██████╗██║  ██║██║ ╚═╝ ██║██║     ╚██████╔╝███████║
 ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚══════╝
                                                MIND
```

**Autonomous AI-Driven Academic Marketplace on Hedera**

[![Built on Hedera](https://img.shields.io/badge/Built%20on-Hedera%20Hashgraph-8A2BE2?style=for-the-badge&logo=hedera&logoColor=white)](https://hedera.com)
[![Powered by Gemini](https://img.shields.io/badge/Powered%20by-Gemini%201.5%20Pro-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)

</div>

---

## What is Campus Mind?

**Campus Mind** is a decentralized, autonomous marketplace where AI agents coordinate to help students **find, verify, and purchase academic notes** — all without manual intervention.

Built on the **Hedera Network**, Campus Mind transforms the informal student "study notes" economy into a transparent, self-sustaining system powered by a Multi-Agent Architecture. Instead of centralized middlemen or trust-based peer exchanges, Campus Mind deploys AI agents that do the heavy lifting: discovering resources, settling micropayments atomically, and even testing your comprehension of what you just bought.

> _"It's not just a file-sharing tool. It's an autonomous academic economy."_

---

## Track

**AI Agents Challenge** — Multi-Agent Systems & Decentralized Infrastructure

---

## The Multi-Agent Architecture

Campus Mind is composed of **four specialized agents** that communicate, delegate, and execute autonomously:

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTENT                              │
│                "Find me notes on Organic Chemistry"             │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
          ┌───────────────────────────────┐
          │       COORDINATOR AGENT       │
          │        (Google Gemini)        │
          │  Parses intent & delegates    │
          └──────┬──────────┬────────────┘
                 │          │
        ┌────────▼──┐   ┌───▼──────────┐
        │   NOTES    │   │  TREASURY    │
        │    AGENT   │   │    AGENT     │
        │  Queries   │   │ Executes     │
        │  Firestore │   │ HBAR atomic  │
        │  for assets│   │ transfers    │
        └────────────┘   │ (95/5 split) │
                         └─────────────┘
                          │
          ┌───────────────▼──────────────┐
          │          QUIZ AGENT          │
          │   Generates active-recall    │
          │   assessments from purchased │
          │   materials via Gemini       │
          └──────────────────────────────┘
```

| Agent | Role | Technology |
|---|---|---|
| **Coordinator** | Parses user intent, orchestrates all other agents | Google Gemini 1.5 Pro |
| **Notes Agent** | Searches and retrieves academic assets from the database | Firestore SDK |
| **Treasury Agent** | Executes atomic HBAR micropayments with a 95/5 revenue split | Hedera SDK + HCS |
| **Quiz Agent** | Generates comprehension assessments from purchased material | Google Gemini 1.5 Pro |

---

## Why Hedera?

- **Hedera Consensus Service (HCS):** Provides a tamper-proof, ordered log of every marketplace transaction — fully transparent and auditable.
- **Low-cost Microtransactions:** HBAR fees are fractions of a cent, making student-scale micropayments economically viable.
- **Atomic Settlement:** The Treasury Agent guarantees that payment and delivery are either both completed or both rolled back — no partial states.
- **Testnet-first:** The entire system runs on Hedera Testnet, making it safe to develop and demo without real funds.

---

## Tech Stack

```
┌──────────────────┬────────────────────────────────────────────┐
│ Layer            │ Technology                                 │
├──────────────────┼────────────────────────────────────────────┤
│ L1 Blockchain    │ Hedera Hashgraph (SDK, HCS, Testnet)       │
│ AI Models        │ Google Gemini 1.5 Pro                      │
│ Frontend         │ Next.js 14 · Tailwind CSS · Shadcn UI      │
│ Backend / DB     │ Firebase (Firestore & Storage)             │
│ Wallet           │ HashConnect (HashPack)                     │
└──────────────────┴────────────────────────────────────────────┘
```

---

## Getting Started

### Prerequisites

- Node.js `v18+`
- A [HashPack](https://www.hashpack.app/) wallet configured on **Hedera Testnet**
- A Firebase project with **Firestore** and **Storage** enabled
- A [Google AI Studio](https://aistudio.google.com/) API key for Gemini
- Hedera Testnet credentials (Account ID + Private Key)

### Installation

**1. Clone the repository**

```bash
git clone <your-repo-link>
cd campus-mind
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

Create a `.env.local` file in the project root:

```env
# ── Hedera Testnet ──────────────────────────────────────
NEXT_PUBLIC_HEDERA_ACCOUNT_ID=0.0.XXXXXXX
HEDERA_PRIVATE_KEY=your_hedera_private_key

# ── Firebase ─────────────────────────────────────────────
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# ── Google Gemini ─────────────────────────────────────────
GEMINI_API_KEY=your_gemini_api_key
```

**4. Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## How It Works — End to End

```
Student searches for notes
        │
        ▼
Coordinator Agent interprets query
        │
        ▼
Library Agent fetches matching assets from Firestore
        │
        ▼
Student selects & initiates purchase via HashPack
        │
        ▼
Treasury Agent executes atomic HBAR transfer
  ├── 95% → Note creator's wallet
  └──  5% → Platform treasury
        │
        ▼
Transaction logged to Hedera Consensus Service (HCS)
        │
        ▼
Quiz Agent generates comprehension assessment
        │
        ▼
Student receives notes + quiz
```

---

## Project Structure

```
campus-mind/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── agent/pay/route.ts      # Treasury Agent — HBAR payment endpoint
│   │   │   ├── chat/route.ts           # Coordinator Agent — Gemini orchestration
│   │   │   └── notes/search/route.ts  # Notes Agent — Firestore asset search
│   │   ├── dashboard/                  # Student dashboard page
│   │   ├── assistant/                  # AI assistant interface
│   │   ├── notesMarketPlace/           # Marketplace browse & purchase UI
│   │   └── page.tsx                    # Root landing page
│   ├── components/                     # Shadcn UI + custom components
│   └── lib/
│       ├── firebase.js                 # Firebase initialization
│       ├── firestoreActions.ts         # Firestore read/write helpers
│       ├── hederaClient.ts             # Hedera SDK setup & HCS client
│       └── utils.ts                    # Shared utility functions
├── public/
├── .env.local                          # Environment variables (not committed)
└── README.md
```

---

## Revenue Model

Every transaction is split atomically at the point of settlement:

| Recipient | Share |
|---|---|
| Note Creator | **95%** of HBAR payment |
| Platform Treasury | **5%** of HBAR payment |

This split is enforced by the **Treasury Agent** at the smart contract level and logged immutably to HCS — creators always get paid fairly, and the platform is self-sustaining.

---

## Roadmap

- [ ] Mainnet deployment with live HBAR payments
- [ ] Agent-to-agent negotiation for dynamic note pricing
- [ ] Reputation scoring system for note creators (on-chain)
- [ ] Cross-university asset discovery
- [ ] Mobile app (React Native + HashPack mobile)
- [ ] DAO governance for platform treasury allocation

---

## Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change. Pull requests should target the `dev` branch.

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: describe your change"
git push origin feature/your-feature-name
# Open a Pull Request
```

---

## License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

<div align="center">

Built with ☕ and a lot of late-night studying in mind.

**Campus Mind** — _The marketplace that studies so you can study._

</div>
