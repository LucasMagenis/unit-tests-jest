class EstacaoMeteorologica {

    // 1. Registra uma nova leitura meteorológica
    registrarLeitura(temperatura, umidade, pressao, vento, chuva, indiceUV) {
        if (
            temperatura < -90 || temperatura > 60 ||
            umidade < 0 || umidade > 100 ||
            pressao < 800 || pressao > 1200 ||
            vento < 0 ||
            chuva < 0 ||
            indiceUV < 0 || indiceUV > 15
        ) {
            throw new Error("Dados meteorológicos inválidos");
        }

        return {
            temperatura,
            umidade,
            pressao,
            vento,
            chuva,
            indiceUV,
            data: new Date()
        };
    }

    // 2. Valida uma leitura meteorológica
    validarLeitura(leitura) {
        if (!leitura) {
            return false;
        }

        if (typeof leitura.temperatura !== "number") {
            return false;
        }

        if (leitura.umidade < 0 || leitura.umidade > 100) {
            return false;
        }

        if (leitura.vento < 0 || leitura.chuva < 0) {
            return false;
        }

        return true;
    }

    // 3. Calcula uma sensação térmica aproximada
    calcularSensacaoTermica(temperatura, vento, umidade) {
        if (temperatura <= 10 && vento > 10) {
            return temperatura - (vento * 0.7);
        }

        if (temperatura >= 25 && umidade >= 70) {
            return temperatura + ((umidade - 40) * 0.1);
        }

        return temperatura;
    }

    // 4. Classifica a temperatura
    classificarTemperatura(temperatura) {
        if (temperatura < 0) {
            return "Muito fria";
        }

        if (temperatura < 15) {
            return "Fria";
        }

        if (temperatura < 25) {
            return "Agradável";
        }

        if (temperatura < 35) {
            return "Quente";
        }

        return "Muito quente";
    }

    // 5. Classifica a umidade
    classificarUmidade(umidade) {
        if (umidade < 30) {
            return "Baixa";
        }

        if (umidade <= 60) {
            return "Normal";
        }

        if (umidade <= 80) {
            return "Alta";
        }

        return "Muito alta";
    }

    // 6. Calcula o ponto de orvalho
    calcularPontoOrvalho(temperatura, umidade) {
        if (umidade < 0 || umidade > 100) {
            throw new Error("Umidade inválida");
        }

        const a = 17.27;
        const b = 237.7;

        const gamma =
            ((a * temperatura) / (b + temperatura)) +
            Math.log(umidade / 100);

        return Number(
            ((b * gamma) / (a - gamma)).toFixed(2)
        );
    }

    // 7. Classifica a pressão atmosférica
    classificarPressao(pressao) {
        if (pressao < 1000) {
            return "Baixa";
        }

        if (pressao <= 1020) {
            return "Normal";
        }

        return "Alta";
    }

    // 8. Calcula a velocidade média do vento
    calcularVelocidadeMediaVento(velocidades) {
        if (!Array.isArray(velocidades) || velocidades.length === 0) {
            throw new Error("Lista de velocidades inválida");
        }

        if (velocidades.some(velocidade => velocidade < 0)) {
            throw new Error("Velocidade inválida");
        }

        const soma = velocidades.reduce(
            (total, velocidade) => total + velocidade,
            0
        );

        return Number((soma / velocidades.length).toFixed(2));
    }

    // 9. Classifica a velocidade do vento
    classificarVento(velocidade) {
        if (velocidade < 5) {
            return "Calmo";
        }

        if (velocidade < 20) {
            return "Moderado";
        }

        if (velocidade < 40) {
            return "Forte";
        }

        if (velocidade < 60) {
            return "Muito forte";
        }

        return "Tempestade";
    }

    // 10. Calcula a quantidade total de chuva
    calcularChuvaTotal(leituras) {
        if (!Array.isArray(leituras)) {
            throw new Error("Leituras inválidas");
        }

        return leituras.reduce(
            (total, leitura) => total + leitura.chuva,
            0
        );
    }

    // 11. Verifica alerta de chuva
    verificarAlertaChuva(chuvaPorHora) {
        if (chuvaPorHora >= 50) {
            return {
                alerta: true,
                nivel: "Severo"
            };
        }

        if (chuvaPorHora >= 20) {
            return {
                alerta: true,
                nivel: "Moderado"
            };
        }

        return {
            alerta: false,
            nivel: "Normal"
        };
    }

    // 12. Verifica alerta de temperatura
    verificarAlertaTemperatura(temperatura) {
        if (temperatura >= 40) {
            return "Alerta extremo de calor";
        }

        if (temperatura <= -10) {
            return "Alerta extremo de frio";
        }

        if (temperatura >= 35) {
            return "Alerta de calor";
        }

        return "Sem alerta";
    }

    // 13. Verifica alerta de vento
    verificarAlertaVento(velocidade) {
        if (velocidade >= 80) {
            return "Perigo extremo";
        }

        if (velocidade >= 60) {
            return "Perigo";
        }

        if (velocidade >= 40) {
            return "Atenção";
        }

        return "Normal";
    }

    // 14. Classifica o índice UV
    classificarIndiceUV(indiceUV) {
        if (indiceUV < 3) {
            return "Baixo";
        }

        if (indiceUV < 6) {
            return "Moderado";
        }

        if (indiceUV < 8) {
            return "Alto";
        }

        if (indiceUV < 11) {
            return "Muito alto";
        }

        return "Extremo";
    }

    // 15. Gera uma previsão simples baseada nas condições atuais
    gerarPrevisao(leitura) {
        if (leitura.chuva > 10) {
            return "Chuva";
        }

        if (leitura.umidade > 80 && leitura.pressao < 1000) {
            return "Possibilidade de chuva";
        }

        if (leitura.temperatura > 30 && leitura.umidade < 50) {
            return "Tempo quente e seco";
        }

        if (leitura.indiceUV >= 8 && leitura.nuvens < 30) {
            return "Ensolarado";
        }

        return "Tempo estável";
    }

    // 16. Calcula a temperatura média
    calcularMediaTemperatura(temperaturas) {
        if (!Array.isArray(temperaturas) || temperaturas.length === 0) {
            throw new Error("Temperaturas inválidas");
        }

        const soma = temperaturas.reduce(
            (total, temperatura) => total + temperatura,
            0
        );

        return Number(
            (soma / temperaturas.length).toFixed(2)
        );
    }

    // 17. Encontra temperatura máxima e mínima
    encontrarTemperaturasExtremas(temperaturas) {
        if (!Array.isArray(temperaturas) || temperaturas.length === 0) {
            throw new Error("Temperaturas inválidas");
        }

        return {
            minima: Math.min(...temperaturas),
            maxima: Math.max(...temperaturas)
        };
    }

    // 18. Detecta uma mudança brusca de temperatura
    detectarMudancaBrusca(temperaturaAnterior, temperaturaAtual) {
        const diferenca = Math.abs(
            temperaturaAtual - temperaturaAnterior
        );

        return {
            houveMudanca: diferenca >= 10,
            variacao: diferenca,
            tipo:
                temperaturaAtual > temperaturaAnterior
                    ? "Aumento"
                    : temperaturaAtual < temperaturaAnterior
                        ? "Queda"
                        : "Estável"
        };
    }

    // 19. Determina a condição climática
    determinarCondicaoClimatica(leitura) {
        if (leitura.chuva > 10) {
            return "Chuvoso";
        }

        if (leitura.nuvens >= 70) {
            return "Nublado";
        }

        if (leitura.nuvens >= 30) {
            return "Parcialmente nublado";
        }

        if (leitura.indiceUV >= 6) {
            return "Ensolarado";
        }

        return "Estável";
    }

    // 20. Gera um relatório meteorológico
    gerarRelatorio(leitura) {
        if (!this.validarLeitura(leitura)) {
            throw new Error("Leitura inválida");
        }

        return {
            temperatura: leitura.temperatura,
            classificacaoTemperatura:
                this.classificarTemperatura(leitura.temperatura),

            umidade: leitura.umidade,
            classificacaoUmidade:
                this.classificarUmidade(leitura.umidade),

            vento: leitura.vento,
            classificacaoVento:
                this.classificarVento(leitura.vento),

            pressao: leitura.pressao,
            classificacaoPressao:
                this.classificarPressao(leitura.pressao),

            indiceUV: leitura.indiceUV,
            classificacaoUV:
                this.classificarIndiceUV(leitura.indiceUV),

            condicao:
                this.determinarCondicaoClimatica(leitura)
        };
    }
}

module.exports = EstacaoMeteorologica;