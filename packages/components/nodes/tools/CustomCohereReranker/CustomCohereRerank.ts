import { INode, INodeData, INodeParams, INodeOutputsValue, ICommonObject } from '../../../src/Interface'
import { getBaseClasses } from '../../../src/utils'
import { CustomCohereRerankTool } from './CustomCohereRerankTool'

class CustomCohereRerankNode implements INode {
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
    inputs: INodeParams[]
    output: INodeOutputsValue[]
    

    constructor() {
        this.label = 'CustomCohereRerankNode'
        this.name = 'CustomCohereRerankNode'
        this.version = 1.0
        this.type = 'CustomCohereRerankNode'
        this.icon = 'customCohereRerankTool.svg'
        this.category = 'Tools'
        this.author = 'Eyal Zisman'
        this.description = 'A tool for reranking embeddings using the cohere rerank retriever'
        this.baseClasses = [this.type, ...getBaseClasses(CustomCohereRerankTool)]
        this.inputs = [
            {
                label: 'Documents',
                name: 'rerankedDocuments',
                type: 'Document',
                description: 'An array of Documents or JSON objects to be reranked, typically from the CohereRerank retriever.',
            },
            {
                label: 'Retriever Name',
                name: 'name',
                type: 'string',
                placeholder: 'custom cohere retriever connector name'
            }
        ]
    
       this.output = [
            {
                label: 'Reranked Documents',
                name: 'documents',
                baseClasses: [...this.baseClasses, 'json'],
                description: 'The reranked documents ready to be passed to worker tools.',
            },
        ]
    }

    public async init(nodeData: INodeData, input: string, options?: ICommonObject): Promise<any> {
        // Initialize parameters or settings here
        const documents = nodeData.inputs?.rerankedDocuments || [];

        console.log("***Test documents =", JSON.stringify(documents));
        // Initialize the tool
        const tool = new CustomCohereRerankTool();

        // Process the documents using the tool
        const result = await tool.run({ documents });

        // Return the processed documents
        return {
            processed_documents: tool
        };
    }
    
    // The `run` method defines the behavior of the node
    public async run(nodeData: INodeData, input: string, options?: ICommonObject): Promise<any> {
        // Extract documents from input
        const documents = nodeData.inputs?.rerankedDocuments || [];

        console.log("***Test documents =", JSON.stringify(documents));
        // Initialize the tool
        const tool = new CustomCohereRerankTool();

        // Process the documents using the tool
        const result = await tool.run({ documents });

        // Return the processed documents
        return {
            processed_documents: tool
        };
    }
}

module.exports = { nodeClass: CustomCohereRerankNode }
