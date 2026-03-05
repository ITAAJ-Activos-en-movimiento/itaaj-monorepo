import GPT3NodeTokenizer from "gpt3-tokenizer";

const tokenizer = new GPT3NodeTokenizer({ type: 'gpt3' })
export const getTokens = (input: string) => {
    const tokens = tokenizer.encode(input);
    return tokens.text.length;    
}