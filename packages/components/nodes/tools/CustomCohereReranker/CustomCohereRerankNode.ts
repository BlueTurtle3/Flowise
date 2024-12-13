import { INode, INodeData } from '../../../src/Interface'
import { getBaseClasses } from '../../../src/utils'
import { CustomCohereRerankTool } from './CustomCohereRerankTool'

export class CustomCohereRerankNode implements INode {
    // Node metadata
    name: string = 'CustomCohereRerankNode';
    description: string = 'A custom node for Cohere Rerank Tool';
    category: string = 'Tools';
    label: string
    version: number
    type: string
    icon: string
    author: string
    baseClasses: string[]

    constructor() {
        this.label = 'CustomCohereRerankNode'
        this.name = 'CustomCohereRerankNode'
        this.version = 1.0
        this.type = 'CustomCohereRerankNode'
        this.icon = 'customCohereRerankNode.png'
        this.category = 'Tools'
        this.author = 'Eyal Zisman'
        this.description = 'A tool for reranking embeddings using the cohere rerank retriever'
        this.baseClasses = [this.type, ...getBaseClasses(CustomCohereRerankTool)]
    }

    
    // The `run` method defines the behavior of the node
    public async run(nodeData: INodeData): Promise<any> {
        // Extract documents from input
        const documents = nodeData.inputs?.documents || [];

        // Initialize the tool
        const tool = new CustomCohereRerankTool();

        // Process the documents using the tool
        const result = await tool.run({ documents });

        // Return the processed documents
        return {
            processed_documents: result.processed_documents
        };
    }
}
