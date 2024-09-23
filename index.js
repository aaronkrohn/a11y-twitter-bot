const { TwitterApi } = require('twitter-api-v2');
const OpenAI = require('openai');
const cron = require('node-cron');

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
            messages: [{ role: 'user', content: 'Provide a brief accessibility tip for mobile app developers focused on improving usability for all users, including those with disabilities. Keep it concise and actionable.' }],
            model: 'gpt-3.5-turbo-0125',
            stream: false
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error generating tip:', error);
    }
}

async function postTweet(content) {
    try {
        const tweet = await twitterClient.v2.tweet(content);
        console.log('Tweet posted:', tweet);
    } catch (error) {
        console.error('Error posting tweet:', error);
    }
}

cron.schedule('0 9,17 * * *', async () => {
    console.log('Generating and posting accessibility tip...');
    const tip = await generateAccessibilityTip();

    if (tip) {
        const tweetContent = `🛠️ Accessibility Tip of the Day:\n\n${tip}\n#Accessibility #A11y #InclusiveDesign`;
        await postTweet(tweetContent);
    }
}, {
    timezone: 'Europe/London',
});