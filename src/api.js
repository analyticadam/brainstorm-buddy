import axios from "axios"; // Import Axios for API requests

// Load environment variables (Vite uses `import.meta.env`)
const API_KEY = import.meta.env.VITE_COHERE_API_KEY;

// Function to call Cohere AI's text generation API
export const generateIdeas = async (topic, format) => {
	try {
		const response = await axios.post(
			"https://api.cohere.ai/v1/generate",
			{
				model: "command",
				prompt: `Generate a ${format} idea about ${topic}.`,
				max_tokens: 100,
				temperature: 0.7,
			},
			{
				headers: {
					Authorization: `Bearer ${API_KEY}`, // Uses environment variable
					"Content-Type": "application/json",
				},
			}
		);

		return response.data.generations[0].text.trim();
	} catch (error) {
		console.error("Error generating content ideas:", error);
		return "Failed to generate an idea. Try again.";
	}
};
