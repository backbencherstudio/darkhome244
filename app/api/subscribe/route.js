import axios from "axios";

export async function POST(req) {
    try {
        const { email } = await req.json()

        if (!validateEmail(email)) {
            return new Response(
                JSON.stringify({ message: "Invaild Email Address" }), {
                status: 400,
            })
        }

        const mailerLiteApiKey = process.env.MAILERLITE_API_KEY
        const groupId = process.env.MAILERLITE_GROUP_ID;

        const response = await axios.post(`https://api.mailerlite.com/api/v2/groups/${groupId}/subscribers`, {
            email: email,
        },
            {
                headers: {
                    'X-MailerLite-ApiKey': mailerLiteApiKey,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.status === 200) {
            return new Response(JSON.stringify({ message: "Subscription successfull!" }, { status: 200 }))
        } else {
            return new Response(JSON.stringify({ message: 'Failed to subscribe. Please try again later.' }, { status: 500 }))
        }

    } catch (error) {
        console.error('Error while subscribing:', error);
        return new Response(JSON.stringify({ message: 'An error occurred. Please try again later.' }, { status: 500 }))
    }
}

// Helper function to validate email format
function validateEmail(email) {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}