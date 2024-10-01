const { TwitterApi } = require('twitter-api-v2');
const OpenAI = require('openai');
require('dotenv').config();

const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_APPKEY,
    appSecret: process.env.TWITTER_APPSECRET,
    accessToken: process.env.TWITTER_ACCESSTOKEN,
    accessSecret: process.env.TWITTER_ACCESSSECRET,
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_APIKEY,
    project: process.env.OPENAI_PROJECT
});

async function generateAccessibilityTip() {
    try {
        const response = await openai.chat.completions.create({
            messages: [{
                role: 'user',
                content: `Act as a senior accessibility expert. Provide a concise, actionable accessibility tip for developers, sourced from https://www.a11yproject.com or a similar reliable accessibility resource. Include relevant links using proper HTML <a href="URL">text</a> formatting for the references. Ensure the entire response is 280 characters or less to fit within a tweet.`
            }],
            model: 'gpt-3.5-turbo',
            stream: false
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error generating tip:', error);
    }
}

module.exports = async function handler(req, res) {
    console.log('Generating and posting accessibility tip...');
    const tip = await generateAccessibilityTip();

    if (tip) {
        const tweetContent = `🛠️ Accessibility Tip of the Day:\n\n${tip}\n#Accessibility #A11y #InclusiveDesign`;
        console.log(tweetContent, 'tweetContent');
        try {
            const tweet = await twitterClient.v2.tweet(tweetContent);
            console.log('Tweet posted:', tweet);
            return res.status(200).json({ message: 'Tip posted successfully!' });
        } catch (error) {
            console.error('Error posting tweet:', error);
            return res.status(500).json({ error: 'Error posting tweet' });
        }
    } else {
        console.log('No tip generated; skipping tweet.');
        return res.status(200).json({ message: 'No tip generated' });
    }
}