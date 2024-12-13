import { CallbackManagerForToolRun } from '@langchain/core/callbacks/manager';
import { RunnableConfig } from '@langchain/core/runnables';
import { Tool } from '@langchain/core/tools'
export class CustomCohereRerankTool extends Tool {
    name: string;
    description: string;
    category: string;
    type: "Tool"

    constructor() {
        super();
        this.name = "CohereProcessedTool";
        this.description = "A custom tool to process documents from Cohere Rerank Retriever";
        this.category = "Tools";
        this.type = "Tool";
    
    }

    protected _call(arg: any, runManager?: CallbackManagerForToolRun, parentConfig?: RunnableConfig): Promise<any> {
        throw new Error('Method not implemented.');
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
