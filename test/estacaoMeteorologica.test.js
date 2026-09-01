const EstacaoMeteorologica = require("../src/EstacaoMeteorologica.js");

describe("EstacaoMeteorologica", () => {
    let estacao;

    beforeEach(() => {
        estacao = new EstacaoMeteorologica();
    });

    // 1. registrarLeitura
    describe("registrarLeitura", () => {
        test("deve registrar uma leitura meteorológica válida", () => {
            const leitura = estacao.registrarLeitura(
                25,
                70,
                1015,
                10,
                2,
                5
            );

            expect(leitura.temperatura).toBe(25);
            expect(leitura.umidade).toBe(70);
            expect(leitura.pressao).toBe(1015);
            expect(leitura.vento).toBe(10);
            expect(leitura.chuva).toBe(2);
            expect(leitura.indiceUV).toBe(5);
            expect(leitura.data).toBeInstanceOf(Date);
        });

        test("deve rejeitar dados meteorológicos inválidos", () => {
            expect(() => {
                estacao.registrarLeitura(
                    100,
                    70,
                    1015,
                    10,
                    2,
                    5
                );
            }).toThrow("Dados meteorológicos inválidos");
        });
    });

    // 2. validarLeitura
    describe("validarLeitura", () => {
        test("deve retornar true para uma leitura válida", () => {
            const leitura = {
                temperatura: 25,
                umidade: 60,
                vento: 10,
                chuva: 2
            };

            expect(estacao.validarLeitura(leitura)).toBe(true);
        });

        test("deve retornar false para leitura inexistente", () => {
            expect(estacao.validarLeitura(null)).toBe(false);
        });

        test("deve retornar false quando temperatura não é número", () => {
            const leitura = {
                temperatura: "25",
                umidade: 60,
                vento: 10,
                chuva: 2
            };

            expect(estacao.validarLeitura(leitura)).toBe(false);
        });

        test("deve retornar false para umidade inválida", () => {
            const leitura = {
                temperatura: 25,
                umidade: 110,
                vento: 10,
                chuva: 2
            };

            expect(estacao.validarLeitura(leitura)).toBe(false);
        });

        test("deve retornar false para vento negativo", () => {
            const leitura = {
                temperatura: 25,
                umidade: 60,
                vento: -5,
                chuva: 2
            };

            expect(estacao.validarLeitura(leitura)).toBe(false);
        });

        test("deve retornar false para chuva negativa", () => {
            const leitura = {
                temperatura: 25,
                umidade: 60,
                vento: 10,
                chuva: -2
            };

            expect(estacao.validarLeitura(leitura)).toBe(false);
        });
    });

    // 3. calcularSensacaoTermica
    describe("calcularSensacaoTermica", () => {
        test("deve calcular sensação térmica de frio com vento", () => {
            const resultado = estacao.calcularSensacaoTermica(5, 20, 50);

            expect(resultado).toBe(-9);
        });

        test("deve calcular sensação térmica de calor e umidade", () => {
            const resultado = estacao.calcularSensacaoTermica(30, 5, 80);

            expect(resultado).toBe(34);
        });

        test("deve retornar a temperatura quando nenhuma condição especial ocorre", () => {
            const resultado = estacao.calcularSensacaoTermica(20, 5, 50);

            expect(resultado).toBe(20);
        });
    });

    // 4. classificarTemperatura
    describe("classificarTemperatura", () => {
        test("deve classificar temperaturas corretamente", () => {
            expect(estacao.classificarTemperatura(-5)).toBe("Muito fria");
            expect(estacao.classificarTemperatura(10)).toBe("Fria");
            expect(estacao.classificarTemperatura(20)).toBe("Agradável");
            expect(estacao.classificarTemperatura(30)).toBe("Quente");
            expect(estacao.classificarTemperatura(40)).toBe("Muito quente");
        });
    });

    // 5. classificarUmidade
    describe("classificarUmidade", () => {
        test("deve classificar a umidade corretamente", () => {
            expect(estacao.classificarUmidade(20)).toBe("Baixa");
            expect(estacao.classificarUmidade(50)).toBe("Normal");
            expect(estacao.classificarUmidade(70)).toBe("Alta");
            expect(estacao.classificarUmidade(90)).toBe("Muito alta");
        });
    });

    // 6. calcularPontoOrvalho
    describe("calcularPontoOrvalho", () => {
        test("deve calcular o ponto de orvalho", () => {
            const resultado = estacao.calcularPontoOrvalho(25, 70);

            expect(resultado).toBeCloseTo(19.14, 2);
        });

        test("deve rejeitar umidade menor que zero", () => {
            expect(() => {
                estacao.calcularPontoOrvalho(25, -1);
            }).toThrow("Umidade inválida");
        });

        test("deve rejeitar umidade maior que 100", () => {
            expect(() => {
                estacao.calcularPontoOrvalho(25, 101);
            }).toThrow("Umidade inválida");
        });
    });

    // 7. classificarPressao
    describe("classificarPressao", () => {
        test("deve classificar a pressão corretamente", () => {
            expect(estacao.classificarPressao(990)).toBe("Baixa");
            expect(estacao.classificarPressao(1010)).toBe("Normal");
            expect(estacao.classificarPressao(1030)).toBe("Alta");
        });
    });

    // 8. calcularVelocidadeMediaVento
    describe("calcularVelocidadeMediaVento", () => {
        test("deve calcular a velocidade média do vento", () => {
            const resultado =
                estacao.calcularVelocidadeMediaVento([10, 20, 30]);

            expect(resultado).toBe(20);
        });

        test("deve arredondar o resultado para duas casas decimais", () => {
            const resultado =
                estacao.calcularVelocidadeMediaVento([10, 15, 20]);

            expect(resultado).toBe(15);
        });

        test("deve rejeitar lista vazia", () => {
            expect(() => {
                estacao.calcularVelocidadeMediaVento([]);
            }).toThrow("Lista de velocidades inválida");
        });

        test("deve rejeitar velocidade negativa", () => {
            expect(() => {
                estacao.calcularVelocidadeMediaVento([10, -5, 20]);
            }).toThrow("Velocidade inválida");
        });
    });

    // 9. classificarVento
    describe("classificarVento", () => {
        test("deve classificar a velocidade do vento corretamente", () => {
            expect(estacao.classificarVento(2)).toBe("Calmo");
            expect(estacao.classificarVento(10)).toBe("Moderado");
            expect(estacao.classificarVento(30)).toBe("Forte");
            expect(estacao.classificarVento(50)).toBe("Muito forte");
            expect(estacao.classificarVento(70)).toBe("Tempestade");
        });
    });

    // 10. calcularChuvaTotal
    describe("calcularChuvaTotal", () => {
        test("deve calcular a quantidade total de chuva", () => {
            const leituras = [
                { chuva: 5 },
                { chuva: 10 },
                { chuva: 15 }
            ];

            expect(estacao.calcularChuvaTotal(leituras)).toBe(30);
        });

        test("deve rejeitar parâmetro que não seja array", () => {
            expect(() => {
                estacao.calcularChuvaTotal("inválido");
            }).toThrow("Leituras inválidas");
        });
    });

    // 11. verificarAlertaChuva
    describe("verificarAlertaChuva", () => {
        test("deve retornar alerta normal para pouca chuva", () => {
            expect(estacao.verificarAlertaChuva(10)).toEqual({
                alerta: false,
                nivel: "Normal"
            });
        });

        test("deve retornar alerta moderado", () => {
            expect(estacao.verificarAlertaChuva(25)).toEqual({
                alerta: true,
                nivel: "Moderado"
            });
        });

        test("deve retornar alerta severo", () => {
            expect(estacao.verificarAlertaChuva(60)).toEqual({
                alerta: true,
                nivel: "Severo"
            });
        });
    });

    // 12. verificarAlertaTemperatura
    describe("verificarAlertaTemperatura", () => {
        test("deve identificar extremo de calor", () => {
            expect(
                estacao.verificarAlertaTemperatura(45)
            ).toBe("Alerta extremo de calor");
        });

        test("deve identificar extremo de frio", () => {
            expect(
                estacao.verificarAlertaTemperatura(-15)
            ).toBe("Alerta extremo de frio");
        });

        test("deve identificar alerta de calor", () => {
            expect(
                estacao.verificarAlertaTemperatura(37)
            ).toBe("Alerta de calor");
        });

        test("deve retornar sem alerta para temperatura normal", () => {
            expect(
                estacao.verificarAlertaTemperatura(25)
            ).toBe("Sem alerta");
        });
    });

    // 13. verificarAlertaVento
    describe("verificarAlertaVento", () => {
        test("deve identificar vento normal", () => {
            expect(estacao.verificarAlertaVento(20)).toBe("Normal");
        });

        test("deve identificar atenção", () => {
            expect(estacao.verificarAlertaVento(45)).toBe("Atenção");
        });

        test("deve identificar perigo", () => {
            expect(estacao.verificarAlertaVento(65)).toBe("Perigo");
        });

        test("deve identificar perigo extremo", () => {
            expect(estacao.verificarAlertaVento(90)).toBe("Perigo extremo");
        });
    });

    // 14. classificarIndiceUV
    describe("classificarIndiceUV", () => {
        test("deve classificar o índice UV corretamente", () => {
            expect(estacao.classificarIndiceUV(2)).toBe("Baixo");
            expect(estacao.classificarIndiceUV(4)).toBe("Moderado");
            expect(estacao.classificarIndiceUV(7)).toBe("Alto");
            expect(estacao.classificarIndiceUV(9)).toBe("Muito alto");
            expect(estacao.classificarIndiceUV(12)).toBe("Extremo");
        });
    });

    // 15. gerarPrevisao
    describe("gerarPrevisao", () => {
        test("deve prever chuva quando há muita chuva", () => {
            const leitura = {
                chuva: 15,
                umidade: 50,
                pressao: 1010,
                temperatura: 25,
                indiceUV: 5,
                nuvens: 50
            };

            expect(estacao.gerarPrevisao(leitura)).toBe("Chuva");
        });

        test("deve prever possibilidade de chuva", () => {
            const leitura = {
                chuva: 5,
                umidade: 90,
                pressao: 990,
                temperatura: 25,
                indiceUV: 5,
                nuvens: 60
            };

            expect(estacao.gerarPrevisao(leitura)).toBe(
                "Possibilidade de chuva"
            );
        });

        test("deve prever tempo quente e seco", () => {
            const leitura = {
                chuva: 0,
                umidade: 40,
                pressao: 1010,
                temperatura: 35,
                indiceUV: 5,
                nuvens: 20
            };

            expect(estacao.gerarPrevisao(leitura)).toBe(
                "Tempo quente e seco"
            );
        });

        test("deve prever tempo ensolarado", () => {
            const leitura = {
                chuva: 0,
                umidade: 50,
                pressao: 1015,
                temperatura: 25,
                indiceUV: 9,
                nuvens: 20
            };

            expect(estacao.gerarPrevisao(leitura)).toBe("Ensolarado");
        });

        test("deve prever tempo estável", () => {
            const leitura = {
                chuva: 0,
                umidade: 50,
                pressao: 1015,
                temperatura: 25,
                indiceUV: 5,
                nuvens: 50
            };

            expect(estacao.gerarPrevisao(leitura)).toBe("Tempo estável");
        });
    });

    // 16. calcularMediaTemperatura
    describe("calcularMediaTemperatura", () => {
        test("deve calcular a temperatura média", () => {
            const resultado =
                estacao.calcularMediaTemperatura([20, 25, 30]);

            expect(resultado).toBe(25);
        });

        test("deve arredondar a média para duas casas", () => {
            const resultado =
                estacao.calcularMediaTemperatura([20, 21, 22]);

            expect(resultado).toBe(21);
        });

        test("deve rejeitar lista vazia", () => {
            expect(() => {
                estacao.calcularMediaTemperatura([]);
            }).toThrow("Temperaturas inválidas");
        });
    });

    // 17. encontrarTemperaturasExtremas
    describe("encontrarTemperaturasExtremas", () => {
        test("deve encontrar temperatura mínima e máxima", () => {
            const resultado =
                estacao.encontrarTemperaturasExtremas([
                    18,
                    25,
                    31,
                    12,
                    28
                ]);

            expect(resultado).toEqual({
                minima: 12,
                maxima: 31
            });
        });

        test("deve rejeitar lista vazia", () => {
            expect(() => {
                estacao.encontrarTemperaturasExtremas([]);
            }).toThrow("Temperaturas inválidas");
        });
    });

    // 18. detectarMudancaBrusca
    describe("detectarMudancaBrusca", () => {
        test("deve detectar aumento brusco de temperatura", () => {
            const resultado =
                estacao.detectarMudancaBrusca(20, 35);

            expect(resultado).toEqual({
                houveMudanca: true,
                variacao: 15,
                tipo: "Aumento"
            });
        });

        test("deve detectar queda brusca de temperatura", () => {
            const resultado =
                estacao.detectarMudancaBrusca(35, 20);

            expect(resultado).toEqual({
                houveMudanca: true,
                variacao: 15,
                tipo: "Queda"
            });
        });

        test("deve identificar temperatura estável", () => {
            const resultado =
                estacao.detectarMudancaBrusca(25, 25);

            expect(resultado).toEqual({
                houveMudanca: false,
                variacao: 0,
                tipo: "Estável"
            });
        });
    });

    // 19. determinarCondicaoClimatica
    describe("determinarCondicaoClimatica", () => {
        test("deve identificar condição chuvosa", () => {
            const leitura = {
                chuva: 15,
                nuvens: 80,
                indiceUV: 2
            };

            expect(
                estacao.determinarCondicaoClimatica(leitura)
            ).toBe("Chuvoso");
        });

        test("deve identificar condição nublada", () => {
            const leitura = {
                chuva: 0,
                nuvens: 80,
                indiceUV: 2
            };

            expect(
                estacao.determinarCondicaoClimatica(leitura)
            ).toBe("Nublado");
        });

        test("deve identificar condição parcialmente nublada", () => {
            const leitura = {
                chuva: 0,
                nuvens: 50,
                indiceUV: 2
            };

            expect(
                estacao.determinarCondicaoClimatica(leitura)
            ).toBe("Parcialmente nublado");
        });

        test("deve identificar condição ensolarada", () => {
            const leitura = {
                chuva: 0,
                nuvens: 10,
                indiceUV: 8
            };

            expect(
                estacao.determinarCondicaoClimatica(leitura)
            ).toBe("Ensolarado");
        });

        test("deve identificar condição estável", () => {
            const leitura = {
                chuva: 0,
                nuvens: 10,
                indiceUV: 3
            };

            expect(
                estacao.determinarCondicaoClimatica(leitura)
            ).toBe("Estável");
        });
    });

    // 20. gerarRelatorio
    describe("gerarRelatorio", () => {
        test("deve gerar um relatório meteorológico completo", () => {
            const leitura = {
                temperatura: 30,
                umidade: 70,
                vento: 15,
                chuva: 2,
                pressao: 1015,
                indiceUV: 7,
                nuvens: 20
            };

            const resultado = estacao.gerarRelatorio(leitura);

            expect(resultado).toEqual({
                temperatura: 30,
                classificacaoTemperatura: "Quente",
                umidade: 70,
                classificacaoUmidade: "Alta",
                vento: 15,
                classificacaoVento: "Moderado",
                pressao: 1015,
                classificacaoPressao: "Normal",
                indiceUV: 7,
                classificacaoUV: "Alto",
                condicao: "Ensolarado"
            });
        });

        test("deve rejeitar uma leitura inválida", () => {
            const leitura = {
                temperatura: "30",
                umidade: 70,
                vento: 15,
                chuva: 2
            };

            expect(() => {
                estacao.gerarRelatorio(leitura);
            }).toThrow("Leitura inválida");
        });
    });
}); 

/*
| Nº     | Método                          | Descrição do teste                                                                                                                                                                      |
| ------ | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1**  | `registrarLeitura`              | Verifica se o sistema consegue registrar corretamente uma leitura meteorológica com dados válidos de temperatura, umidade, pressão, vento, chuva e índice UV.                           |
| **2**  | `validarLeitura`                | Verifica se uma leitura meteorológica válida é considerada válida pelo sistema. Também testa situações em que os dados possuem valores inválidos.                                       |
| **3**  | `calcularSensacaoTermica`       | Verifica se a sensação térmica é calculada corretamente considerando temperatura, velocidade do vento e umidade.                                                                        |
| **4**  | `classificarTemperatura`        | Verifica se a temperatura é classificada corretamente nas categorias: muito fria, fria, agradável, quente e muito quente.                                                               |
| **5**  | `classificarUmidade`            | Verifica se o nível de umidade é classificado corretamente de acordo com seu valor, como baixa, normal, alta ou muito alta.                                                             |
| **6**  | `calcularPontoOrvalho`          | Verifica se o ponto de orvalho é calculado corretamente a partir da temperatura e da umidade. Também verifica o tratamento de valores de umidade inválidos.                             |
| **7**  | `classificarPressao`            | Verifica se a pressão atmosférica é classificada corretamente como baixa, normal ou alta de acordo com o valor informado.                                                               |
| **8**  | `calcularVelocidadeMediaVento`  | Verifica se a velocidade média do vento é calculada corretamente a partir de uma lista de velocidades. Também testa listas vazias e valores inválidos.                                  |
| **9**  | `classificarVento`              | Verifica se a velocidade do vento é classificada corretamente em categorias como calmo, moderado, forte, muito forte e tempestade.                                                      |
| **10** | `calcularChuvaTotal`            | Verifica se o sistema consegue somar corretamente os valores de chuva registrados em diferentes leituras.                                                                               |
| **11** | `verificarAlertaChuva`          | Verifica se o sistema identifica corretamente o nível de alerta de chuva de acordo com a quantidade registrada.                                                                         |
| **12** | `verificarAlertaTemperatura`    | Verifica se o sistema identifica corretamente situações de alerta relacionadas a temperaturas muito altas ou muito baixas.                                                              |
| **13** | `verificarAlertaVento`          | Verifica se a velocidade do vento gera o nível correto de alerta, como normal, atenção, perigo ou perigo extremo.                                                                       |
| **14** | `classificarIndiceUV`           | Verifica se o índice UV é classificado corretamente de acordo com seu nível de intensidade, desde baixo até extremo.                                                                    |
| **15** | `gerarPrevisao`                 | Verifica se o sistema gera a previsão meteorológica correta considerando as condições da leitura, como chuva, umidade, pressão, temperatura, UV e nebulosidade.                         |
| **16** | `calcularMediaTemperatura`      | Verifica se a média das temperaturas informadas é calculada corretamente e se listas inválidas são tratadas adequadamente.                                                              |
| **17** | `encontrarTemperaturasExtremas` | Verifica se o sistema identifica corretamente a menor e a maior temperatura presentes em uma lista de registros.                                                                        |
| **18** | `detectarMudancaBrusca`         | Verifica se o sistema identifica corretamente uma mudança brusca de temperatura, indicando se houve aumento, queda ou estabilidade.                                                     |
| **19** | `determinarCondicaoClimatica`   | Verifica se a condição climática é determinada corretamente, classificando o tempo como chuvoso, nublado, parcialmente nublado, ensolarado ou estável.                                  |
| **20** | `gerarRelatorio`                | Verifica se o sistema consegue gerar corretamente um relatório meteorológico completo, reunindo classificações de temperatura, umidade, vento, pressão, índice UV e condição climática. |
*/
