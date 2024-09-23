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

// Function to generate an accessibility tip
async function generateAccessibilityTip() {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{
                role: 'user',
                content: 'Provide a brief accessibility tip for mobile app developers focused on improving usability for all users, including those with disabilities. Keep it concise and actionable.'
            }],
            stream: false,
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error generating tip:', error);
        return null; // Return null if there's an error
    }
}

// Main handler for Vercel function
export default async function handler(req, res) {
    if (req.method === 'POST') {
        console.log('Generating and posting accessibility tip...');
        const tip = await generateAccessibilityTip();

        if (tip) {
            const tweetContent = `🛠️ Accessibility Tip of the Day:\n\n${tip}\n#Accessibility #A11y #InclusiveDesign`;
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
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
