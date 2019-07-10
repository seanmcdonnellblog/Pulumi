import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";
import * as config from "./config";

const resourceGroup = new azure.core.ResourceGroup(config.resourceGroupName, {
    name: config.resourceGroupName,
    location: config.location,
    tags: {
        environment: "HUB",
        Service: "Pulumi",
        Category: "Infrastructure"
    },
});

const resourceArguments = {
    resourceGroupName: resourceGroup.name,
    location: resourceGroup.location,
};

const virtualNetwork = new azure.network.VirtualNetwork(config.virtualNetworkName, {
    ...resourceArguments,

    name: config.virtualNetworkName,
    addressSpaces: [config.networkAddressSpace],
    tags: {
        environment: "HUB",
        Service: "Pulumi",
        Category: "Infrastructure"
    },
})

const dmzSubnet = new azure.network.Subnet(config.subnetNameDMZ, {
    ...resourceArguments,
    name: config.subnetNameDMZ,
    virtualNetworkName: virtualNetwork.name,
    addressPrefix: "10.100.1.0/24",
});
const webSubnet = new azure.network.Subnet(config.subnetNameWEB, {
    ...resourceArguments,
    name: config.subnetNameWEB,
    virtualNetworkName: virtualNetwork.name,
    addressPrefix: "10.100.2.0/24",
});
const appSubnet = new azure.network.Subnet(config.subnetNameAPP, {
    ...resourceArguments,
    name: config.subnetNameAPP,
    virtualNetworkName: virtualNetwork.name,
    addressPrefix: "10.100.3.0/24",
});

const storageAccount = new azure.storage.Account(config.storageAccountName, {
   ...resourceArguments,
   name: config.storageAccountName,
   accountTier: "Standard",
   accountReplicationType: "lrs",
   tags: {
    environment: "HUB",
    Service: "Pulumi",
    Category: "Infrastructure"
},
});

const nsgGroupDMZ = new azure.network.NetworkSecurityGroup(config.nsgGroupNameDMZ, {
    ...resourceArguments,
    name: config.nsgGroupNameDMZ,
    
    securityRules: [{
          access: "Allow",
          destinationAddressPrefix: "*",
          destinationPortRange: "*",
          direction: "Inbound",
          name: "AllowInboundTCP",
          priority: 100,
          protocol: "Tcp",
          sourceAddressPrefix: "*",
          sourcePortRange: "*",
          }],
          tags: {
            environment: "HUB",
            Service: "Pulumi",
            Category: "Infrastructure"
        },

});
const nsgGroupWEB = new azure.network.NetworkSecurityGroup(config.nsgGroupNameWEB, {
    ...resourceArguments,
    name: config.nsgGroupNameWEB,
    
    securityRules: [{
          access: "Allow",
          destinationAddressPrefix: "*",
          destinationPortRange: "*",
          direction: "Inbound",
          name: "AllowInboundTCP",
          priority: 100,
          protocol: "Tcp",
          sourceAddressPrefix: "*",
          sourcePortRange: "*",
          }],
          tags: {
            environment: "HUB",
            Service: "Pulumi",
            Category: "Infrastructure"
        },

});
const nsgGroupAPP = new azure.network.NetworkSecurityGroup(config.nsgGroupNameAPP, {
    ...resourceArguments,
    name: config.nsgGroupNameAPP,
    
    securityRules: [{
          access: "Allow",
          destinationAddressPrefix: "*",
          destinationPortRange: "*",
          direction: "Inbound",
          name: "AllowInboundTCP",
          priority: 100,
          protocol: "Tcp",
          sourceAddressPrefix: "*",
          sourcePortRange: "*",
          }],
          tags: {
            environment: "HUB",
            Service: "Pulumi",
            Category: "Infrastructure"
        },

});

const dmzSubnetNetworkSecurityGroupAssociation = new azure.network.SubnetNetworkSecurityGroupAssociation("DMZ", {
    networkSecurityGroupId: nsgGroupDMZ.id,
    subnetId: dmzSubnet.id,
});
const webSubnetNetworkSecurityGroupAssociation = new azure.network.SubnetNetworkSecurityGroupAssociation("WEB", {
    networkSecurityGroupId: nsgGroupWEB.id,
    subnetId: webSubnet.id,
});
const appSubnetNetworkSecurityGroupAssociation = new azure.network.SubnetNetworkSecurityGroupAssociation("APP", {
    networkSecurityGroupId: nsgGroupAPP.id,
    subnetId: appSubnet.id,
});

export const resourceGroupName = resourceGroup.name;
export const resourceGroupLocation = resourceGroup.location;
export const virtualNetworkName = virtualNetwork.name;
export const subnetNameDMZ = dmzSubnet.id;
export const subnetNameWEB = webSubnet.id;
export const subnetNameAPP = appSubnet.id;
export const addressSpaces = virtualNetwork.addressSpaces;
export const vnetID = virtualNetwork.id;