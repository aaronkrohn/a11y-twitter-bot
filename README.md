# Accessibility Tips Twitter Bot

This project is a Twitter bot that posts daily accessibility tips to help raise awareness and promote inclusive practices. The bot uses the Twitter API and OpenAI's GPT to generate relevant tips for users.

## Features

- Posts accessibility tips daily at specified times (9 AM and 5 PM UK time).
- Generates tips using OpenAI's GPT model.

## Technologies Used

- Node.js
- Twitter API v2
- OpenAI API
- node-cron for scheduling tasks
- dotenv for environment variable management

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (Node Package Manager)
- A Twitter Developer account with API access
- OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/accessibility-twitter-bot.git
   cd accessibility-twitter-bot

2. Install the required packages:
   ```
   npm install

3. Create a .env file in the root directory and add your environment variables:
   ```
   TWITTER_API_KEY=your_twitter_api_key
   TWITTER_API_SECRET=your_twitter_api_secret
   TWITTER_ACCESSTOKEN=your_twitter_api_secret
   TWITTER_ACCESSSECRET=your_twitter_api_secret
   OPENAI_API_KEY=your_openai_api_key
   OPENAI_PROJECT=your_openai_api_key

### Getting started
To start the bot, run the following command in your terminal:

```
node index.js
```