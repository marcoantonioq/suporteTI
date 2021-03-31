export const valid = {
  /**
   * Verifica se string está vazia
   * @param {string} field string
   * @returns boolean
   */
  isNotEmpty(field) {
    return field.trim() !== '';
  },

  /**
   * Verifica se string está vazia
   * @param {string} field string
   * @returns function
   */
  include(txt) {
    /**
     * Verifica se string está vazia
     * @param {string} str string
     * @returns boolean
     */
    let fn = (str) => Boolean(txt.includes(str));
    return fn;
  },

  /**
   * Verifica se string está vazia
   * @param {Number} n1 Primeiro numero
   * @param {Number} n2 Segundo numero
   * @returns function
   */
  between(n1, n2) {
    /**
     * Valor está entre ${n1} ${n2}
     * @param {number} valor Numero comparado
     * @returns boolean
     */
    let fn = (valor) => valor >= n1 && valor < n2;
    return fn;
  },

  /**
   * Menor que
   * @param {Number} n1 Menor que n1
   * @returns boolean
   */
  lt(n1) {
    /**
     * Maior que
     * @param {Number} n1 Maior que n1
     * @returns boolean
     */
    return (n2) => n2 < n1;
  },
  /**
   * Verifica se IPv4 é privado
   * @param {string} address Informe IP
   * @returns boolean
   */
  ipIsPrivate(address) {
    return (
      /10\.\d+\.\d+\.\d+/.test(address) ||
      /172\.(1[6-9]|2[0-9]|3[0-1])\.\d+\.\d+/.test(address) ||
      /^(192)\.(168)\.(.*)\.(.*)$/.test(address)
    );
  },
};

// console.log(new Validation().between(1, 5)(2));
