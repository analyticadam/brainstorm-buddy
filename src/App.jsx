import { useState } from "react"; // Import React's useState hook
import { generateIdeas } from "./api"; // Import API function
import "./styles/App.css"; // Import external CSS file

const App = () => {
	const [topic, setTopic] = useState(""); // Stores the user-inputted topic
	const [format, setFormat] = useState("Blog Post"); // Stores selected content format
	const [idea, setIdea] = useState(""); // Stores AI-generated idea

	// Function triggered when "Generate Ideas" is clicked
	const handleGenerate = async () => {
		if (!topic.trim()) {
			setIdea("Please enter a topic first!"); // Prevents empty requests
			return;
		}

		setIdea("Generating... Please wait."); // Shows a loading message

		const generatedText = await generateIdeas(topic, format); // Calls AI API
		setIdea(generatedText); // Stores AI-generated content
	};

	return (
		<div className="container">
			<h1>Content Brainstorming Generator</h1>

			{/* Input field for user to enter a topic */}
			<input
				type="text"
				placeholder="Enter a topic..."
				value={topic}
				onChange={(e) => setTopic(e.target.value)}
			/>

			{/* Dropdown for selecting content format */}
			<select value={format} onChange={(e) => setFormat(e.target.value)}>
				<option>Blog Post</option>
				<option>Tweet Thread</option>
				<option>YouTube Script</option>
				<option>Instagram Caption</option>
				<option>LinkedIn Post</option>
			</select>

			{/* Button to trigger AI idea generation */}
			<button onClick={handleGenerate}>Generate Ideas</button>

			{/* Display AI-generated content idea */}
			{idea && <p className="idea-output">Idea: {idea}</p>}
		</div>
	);
};

export default App;
