import {
  PublisherBase,
  PublisherOptions,
} from "@electron-forge/publisher-base";
import { ICustomPublisherConfig} from "./Config";


export default class CustomPublisher extends PublisherBase<ICustomPublisherConfig>   {
	name = "CustomPublisher";
	
	async publish(options: PublisherOptions): Promise<void> {
		console.log(this.config);
		for (const result of options.makeResults) {
			console.log('---------');
			console.log(result);
			// await createVersionIfNotExists();
			// await uploadDistributable(result);
		}
	}	
}

export { CustomPublisher, ICustomPublisherConfig };