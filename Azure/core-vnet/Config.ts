import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();

//location
export const location = config.require("location");
// Resource Group
export const resourceGroupName = config.require("resourceGroupName");

// Virtual Networking configuration
export const virtualNetworkName = config.require("virtualNetworkName");
export const networkAddressSpace = config.require("networkAddressSpace");
export const subnetNameDMZ = config.require("subnetNameDMZ");
export const subnetNameWEB = config.require("subnetNameWEB");
export const subnetNameAPP = config.require("subnetNameAPP");
export const nsgGroupNameDMZ = config.require("nsgGroupNameDMZ");
export const nsgGroupNameWEB = config.require("nsgGroupNameWEB");
export const nsgGroupNameAPP = config.require("nsgGroupNameAPP");
//Storage Account configuration
export const storageAccountName = config.require("storageAccountName");