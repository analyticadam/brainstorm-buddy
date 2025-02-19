import { useState } from "react";
import { generateIdeas } from "./api"; // Import API function
import "../content-brainstormer/src/styles/App.css"; // Import CSS

const App = () => {
	const [topic, setTopic] = useState(""); // Stores topic input
	const [format, setFormat] = useState("Blog Post"); // Stores content format
	const [idea, setIdea] = useState(""); // Stores generated idea
	const [loading, setLoading] = useState(false); // Stores loading state
	const [history, setHistory] = useState([]); // Stores history of generated ideas

	// Function to generate AI content
	const handleGenerate = async () => {
		if (!topic.trim()) {
			setIdea("Please enter a topic first!"); // Prevent empty requests
			return;
		}

		setLoading(true); // Show loading animation
		setIdea(""); // Clear previous idea

		const generatedText = await generateIdeas(topic, format); // Call AI API
		setIdea(generatedText); // Store AI-generated content
		setLoading(false); // Remove loading state

		setHistory([...history, generatedText]); // Save to history
	};

	// Function to copy generated text
	const handleCopy = () => {
		navigator.clipboard.writeText(idea);
		alert("Copied to clipboard!");
	};

	return (
		<div className="container">
			<h1>Content Brainstorming Generator</h1>

			<input
				type="text"
				placeholder="Enter a topic..."
				value={topic}
				onChange={(e) => setTopic(e.target.value)}
			/>

			<select value={format} onChange={(e) => setFormat(e.target.value)}>
				<option>Blog Post</option>
				<option>Tweet Thread</option>
				<option>YouTube Script</option>
				<option>Instagram Caption</option>
				<option>LinkedIn Post</option>
			</select>

			<button onClick={handleGenerate} disabled={loading}>
				{loading ? "Generating..." : "Generate Ideas"}
			</button>

			{loading && <p className="loading">AI is thinking...</p>}

			{idea && (
				<div className="response-box">
					<p className="idea-output">
						<strong>Idea:</strong> {idea}
					</p>
					<button className="copy-button" onClick={handleCopy}>
						Copy to Clipboard
					</button>
				</div>
			)}

			{history.length > 0 && (
				<div className="history-container">
					<p className="history-title">Previous Ideas:</p>
					{history.map((item, index) => (
						<p key={index} className="history-item">
							{item}
						</p>
					))}
				</div>
			)}
		</div>
	);
};

export default App;
