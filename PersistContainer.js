import tickedoff from 'tickedoff'
import {Container} from "unstated"

export class PersistContainer extends Container{
	persist = null
	
	constructor() {
		super();
		
		const rehydrate = async () => {
			const {key, version, storage} = this.persist
			const partialState = {_persist_version: version}
			
			try{
				const serialState = await storage.getItem(key);
				
				if(serialState !== null){
					const incomingState = JSON.parse(serialState)
					const oldVersion = incomingState._persist_version
					await this.setState(incomingState)
				}
				else{
					console.log("no state on disk")
					await this.setState(partialState)
				}
			}
			catch(err){
				await this.setState(partialState)
				if (process.env.NODE_ENV !== 'production'){
					console.log("error during rehydrate", err);
				}
			}
			finally{
				const persist = async () => {
					try{
						console.log("persisting state..")
						await storage.setItem(key, JSON.stringify(this.state))
					}
					catch(err) {
						if(process.env.NODE_ENV !== 'production'){
							console.log("unstated-persist: err during store, err");
						}
					}
				}
				this.subscribe(persist)
			}
		};
		tickedoff(rehydrate);			
	}
}

export const isBootstrapped = container =>
container.state._persist_version !== undefined