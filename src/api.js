import axios from "axios"; // Import Axios for API requests

// Function to call Cohere AI's text generation API
export const generateIdeas = async (topic, format) => {
	try {
		const response = await axios.post(
			"https://api.cohere.ai/v1/generate", // ✅ Correct Cohere API endpoint
			{
				model: "command", // ✅ Cohere's latest free-tier model
				prompt: `Generate a ${format} idea about ${topic}.`,
				max_tokens: 100, // Limits response length
				temperature: 0.7, // Controls randomness
			},
			{
				headers: {
					Authorization: `Bearer wpFdB1s0bMUIK2XXu5NfHHRVaoN7n1NwXFVPZJbt`, // 🔥 Replace with actual API key
					"Content-Type": "application/json",
				},
			}
		);

		console.log("Full API Response:", response.data); // ✅ Debugging log

		// ✅ Extracting AI-generated text correctly
		if (response.data.generations && response.data.generations.length > 0) {
			return response.data.generations[0].text.trim(); // ✅ Return AI-generated text
		} else {
			return "Unexpected API response. Please check the API request format.";
		}
	} catch (error) {
		console.error("Error generating content ideas:", error);
		return "Failed to generate an idea. Try again.";
	}
};
