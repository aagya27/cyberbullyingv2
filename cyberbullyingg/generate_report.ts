import * as fs from "fs";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, ImageRun } from "docx";

const createReport = async () => {
    
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                
                new Paragraph({
                    text: "PROJECT REPORT ON",
                    heading: HeadingLevel.TITLE,
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 500, after: 300 },
                }),
                new Paragraph({
                    text: "Cyberbullying Detection System",
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 500 },
                }),
                new Paragraph({
                    text: "Submitted by: User",
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 2000, after: 200 },
                }),
                new Paragraph({
                    text: new Date().toLocaleDateString(),
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 200 },
                }),
                new Paragraph({
                    text: "",
                    pageBreakBefore: true,
                }),

                // Table of Contents (Manual for simplicity in script)
                new Paragraph({
                    text: "Table of Contents",
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 300 },
                }),
                new Paragraph("1. Introduction........................................................................................... 3"),
                new Paragraph("2. Problem Statement................................................................................... 3"),
                new Paragraph("3. System Architecture................................................................................ 4"),
                new Paragraph("4. Technology Stack..................................................................................... 5"),
                new Paragraph("5. Implementation Details............................................................................. 6"),
                new Paragraph("6. Results and Verification........................................................................... 8"),
                new Paragraph("7. Conclusion............................................................................................... 9"),
                new Paragraph({
                    text: "",
                    pageBreakBefore: true,
                }),

                // 1. Introduction
                new Paragraph({
                    text: "1. Introduction",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    text: "In the digital age, social media has become a primary mode of communication. However, this has also led to the rise of cyberbullying—a pervasive issue affecting millions of users worldwide. The Cyberbullying Detection System is a web-based application designed to detect and flag harmful content such as insults, threats, and hate speech in real-time.",
                    spacing: { after: 200 },
                }),
                new Paragraph({
                    text: "This project leverages Artificial Intelligence, specifically Natural Language Processing (NLP), to analyze text directly in the user's browser, ensuring privacy and speed.",
                    spacing: { after: 200 },
                }),

                
                new Paragraph({
                    text: "2. Problem Statement",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    text: "Traditional moderation relies heavily on manual review, which is slow and unscalable, or simple keyword filters, which are easily bypassed. There is a need for an intelligent system that can understand the context of toxicity and provide immediate feedback to users or administrators.",
                    spacing: { after: 200 },
                }),

                
                new Paragraph({
                    text: "3. System Architecture",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    text: "The system follows a Client-Side AI architecture. Unlike traditional setups where text is sent to a backend server for analysis, this system loads a pre-trained TensorFlow model directly into the browser.",
                    spacing: { after: 200 },
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Key Benefits:", bold: true }),
                    ],
                }),
                new Paragraph({ text: "• Privacy: User data never leaves the device.", bullet: { level: 0 } }),
                new Paragraph({ text: "• Latency: Zero network latency for inference.", bullet: { level: 0 } }),
                new Paragraph({ text: "• Cost: No expensive backend GPU servers required.", bullet: { level: 0 } }),

                
                new Paragraph({
                    text: "4. Technology Stack",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({ text: "• Frontend: React.js with TypeScript", bullet: { level: 0 } }),
                new Paragraph({ text: "• Build Tool: Vite", bullet: { level: 0 } }),
                new Paragraph({ text: "• AI/ML: TensorFlow.js (Toxicity Model)", bullet: { level: 0 } }),
                new Paragraph({ text: "• Styling: Tailwind CSS & Shadcn UI", bullet: { level: 0 } }),
                new Paragraph({ text: "• Persistence: LocalStorage (Browser Database)", bullet: { level: 0 } }),

                
                new Paragraph({
                    text: "5. Implementation Details",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    text: "5.1 AI Model Integration",
                    heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph({
                    text: "We utilized the '@tensorflow-models/toxicity' library. A threshold of 0.6 was configured to ensure high sensitivity to potential threats. The model classifies text into 7 categories: identity_attack, insult, obscene, severe_toxicity, sexual_explicit, threat, and toxicity.",
                    spacing: { after: 200 },
                }),
                new Paragraph({
                    text: "5.2 Data Persistence",
                    heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph({
                    text: "A custom React hook 'useIncidents' was created to manage the state of detected threats. It synchronizes the application state with the browser's LocalStorage, ensuring that data persists even after the page is refreshed.",
                    spacing: { after: 200 },
                }),

                
                new Paragraph({
                    text: "6. Results and Verification",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    text: "The system successfully detects toxic content. For example, the phrase 'You are incompetent' was flagged as an 'Insult' with high confidence. The application dashboard correctly reflects these statistics in real-time.",
                    spacing: { after: 200 },
                }),
                new Paragraph({
                    text: "Testing confirmed that:",
                    spacing: { after: 100 },
                }),
                new Paragraph({ text: "• Safe text returns 'No Threat Detected'.", bullet: { level: 0 } }),
                new Paragraph({ text: "• Toxic text is immediately flagged.", bullet: { level: 0 } }),
                new Paragraph({ text: "• Incidents are logged and viewable in the Incidents page.", bullet: { level: 0 } }),


                
                new Paragraph({
                    text: "7. Conclusion",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    text: "The Cyberbullying Detection System demonstrates the power of client-side AI in creating safer online spaces. By providing real-time, privacy-preserving moderation, it empowers users to identify and potentially prevent harassment efficiently. Future enhancements could include support for multiple languages and image analysis.",
                    spacing: { after: 200 },
                }),
            ],
        }],
    });

    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync("Cyberbullying_Detection_Report.docx", buffer);
    console.log("Report generated successfully: Cyberbullying_Detection_Report.docx");
};

createReport();
