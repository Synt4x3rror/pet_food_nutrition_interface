export default class DMBHelper {
    /**
     * Obtain the value percentage of dry matter base of parameter entered vs moisture content
     * @param {number} mositure - An integer / floating point number representig the moisture content of the item to be evaluated
     * @param {number} parameter - An integer / floating point number representing the percentage of this paramater contained in the item to be evaluated, excluding moisture.
     * @returns {number} - AN intger / floating point number representing the dry matter base concentration of the parameter entered.
     */
    static getDMBValue(mositure, parameter) {
        let result = 0
        try {
            const base = 100 - mositure
            result = (parameter/base) * 100
        } catch (error) {
            // Do Nothing
        }
        
        return result
    }
}