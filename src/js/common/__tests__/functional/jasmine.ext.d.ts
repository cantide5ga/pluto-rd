//Augmentation: 
//https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#augmenting-globalmodule-scope-from-modules
export {};

declare global {
    namespace jasmine {
        interface Matchers {  
            toHaveState(stateKey: string, stateValue?:any): boolean;
            toBeEmpty(): boolean;
            toBePresent(): boolean;
        }    
    }
    
}