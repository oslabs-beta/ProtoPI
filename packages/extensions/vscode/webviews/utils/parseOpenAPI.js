
import yaml from 'js-yaml';

export function parseOpenAPI(yamlContent) {
    try {
        const parsedData = yaml.load(yamlContent);
        return parsedData;
    } catch (e) {
        console.error('Error parsing YAML:', e);
        return null;
    }
}
