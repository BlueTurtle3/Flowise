export class CustomCohereRerankTool {
    name: string;
    description: string;
    category: string;
    type: "Tool"

    constructor() {
        this.name = "CohereProcessedTool";
        this.description = "A custom tool to process documents from Cohere Rerank Retriever";
        this.category = "Tools";
        this.type = "Tool";
    }

    // The main function that defines the tool's behavior
    async run(input: { documents: { content: string; metadata: object; score: number }[] }) {
        // Extract documents from input
        const documents = input.documents || [];

        // Transform the documents into a simplified format
        const processedDocuments = documents.map(doc => ({
            content: doc.content || "",
            metadata: doc.metadata || {},
            score: doc.score || 0
        }));

        // Return the processed documents in the expected format
        return {
            processed_documents: processedDocuments
        };
    }
};
