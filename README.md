# Shelved — Backend API

REST API for Shelved, a reading list app for people who never finish the books they start. No guilt, no progress bars, no streaks.

---

## Stack

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT** + **bcrypt** for authentication
- **Deployed on:** Heroku

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account

### Installation

```bash
git clone https://github.com/zma8/Shelved-api.git
cd Shelved-api
npm install
```

### Environment Variables

Create a `.env` file in the root and dont commit this

### Run Locally

```bash
npm run dev
```

API runs at `http://localhost:3000`

---

## Key Design Decisions

**No delete route.** Books cannot be deleted — only moved to "Not for me".Deleting a book feels like failure. Marking it "Not for me" feels like a decision.

**`lastOpened` auto-updates.** Every PUT request updates `lastOpened` to the current timestamp. 

**`highlight` field.** When a user marks a book as Done or Not for me, a popup asks for a reflection like your favourite part or what didn't work. This is optional.

**Per-user isolation.** Every book has a `userId` field. Every GET and PUT query filters by `req.user._id` extracted from the verified JWT. A user cannot read or modify another user's books even if they know the book ID.

---

## Front end repo
[Shelved-React](https://github.com/zma8/Shelved-React)

---

## Author

Zainab Moosa — [github.com/zma8](https://github.com/zma8)