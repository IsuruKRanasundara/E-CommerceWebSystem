const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

class SamlService {
    constructor() {
        this.parser = new xml2js.Parser({ explicitArray: false });
    }

    // Parse SAML Response
    async parseSamlResponse(samlResponse) {
        try {
            const decoded = Buffer.from(samlResponse, 'base64').toString('utf8');
            const parsed = await this.parser.parseStringPromise(decoded);
            return parsed;
        } catch (error) {
            throw new Error(`Failed to parse SAML response: ${error.message}`);
        }
    }

    // Extract user attributes from SAML response
    extractUserAttributes(parsedResponse) {
        try {
            const assertion = parsedResponse['samlp:Response']['saml:Assertion'];
            const attributeStatement = assertion['saml:AttributeStatement'];
            const attributes = attributeStatement['saml:Attribute'];

            const userAttributes = {};

            if (Array.isArray(attributes)) {
                attributes.forEach(attr => {
                    const name = attr.$.Name;
                    const value = attr['saml:AttributeValue'];
                    userAttributes[name] = value;
                });
            }

            return userAttributes;
        } catch (error) {
            throw new Error(`Failed to extract user attributes: ${error.message}`);
        }
    }

    // Validate SAML signature (basic implementation)
    validateSignature(samlResponse, certificate) {
        // In a production environment, implement proper signature validation
        // This is a placeholder for demonstration
        return true;
    }

    // Generate SAML AuthnRequest
    generateAuthnRequest(options = {}) {
        const requestId = '_' + Math.random().toString(36).substr(2, 9);
        const timestamp = new Date().toISOString();

        const authnRequest = `
            <samlp:AuthnRequest 
                xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
                xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
                ID="${requestId}"
                Version="2.0"
                IssueInstant="${timestamp}"
                Destination="${options.destination || process.env.SAML_ENTRY_POINT}"
                AssertionConsumerServiceURL="${options.acsUrl || process.env.SAML_CALLBACK_URL}"
                ProtocolBinding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST">
                <saml:Issuer>${options.issuer || process.env.SAML_ISSUER}</saml:Issuer>
                <samlp:NameIDPolicy Format="urn:oasis:names:tc:SAML:2.0:nameid-format:emailAddress" AllowCreate="true"/>
            </samlp:AuthnRequest>
        `;

        return Buffer.from(authnRequest).toString('base64');
    }
}

module.exports = new SamlService();