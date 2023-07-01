import { SetMetadata } from "@nestjs/common";

export const PUBLIC_ENDPOINT = 'esteEndpointEhPublico';
export const Public = () => SetMetadata(PUBLIC_ENDPOINT, true);