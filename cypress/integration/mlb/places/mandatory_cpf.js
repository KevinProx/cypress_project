import { buildFlowData } from "../../../support/flow_utils";
import { difference, format, todayPlus, translate } from "../../../support/date_utils";
import * as LandingPage from "../../../pages/landing_page";
import * as HubPage from "../../../pages/hub_page";
import * as SalesPage from "../../../pages/sales_page";

context('MLB - Places - Mandatory - CPF', () => {
    before(() => {
        cy.setSite('MLB');
        cy.login();
    });

    context('Incentive - Multiple', () => {
        before(() => {
            cy.setFlow(buildFlowData(
                'MLB',
                'PLACES',
                'MIGRATION',
                true,
                true,
                'MULTIPLE',
                'CPF'
            ));
            cy.injectUser();
        });

        describe('Validate landing content', () => {
            it('Initial state', () => {
                let state = Cypress.env('state');
                let limitDate = translate(Cypress.env('flowData')['limit_date']);
                let activationDate = translate(Cypress.env('flowData')['activation_date']);
                let daysToLimit = difference(Cypress.env('flowData')['limit_date']);

                cy.access('landing');

                LandingPage.checkHeaderTitle('Ative seus envios nas Agências Mercado Livre e ofereça envios mais rápidos');
                LandingPage.checkHeaderSubtitle(`Você vai ganhar agilidade ao despachar suas vendas, já que nossas agências têm horário estendido e atendimento preferencial. Para ativar seu novo serviço, abra sua empresa em ${state} e informe pra gente o CNPJ até ${limitDate}.`);
                LandingPage.checkHeaderButtonContent('Ativar envios nas agências');
                LandingPage.checkBenefitsTitle('Aproveite os benefícios exclusivos');
                LandingPage.checkBenefitsCards([
                    {
                        text: 'Vai oferecer envios mais rápidos aos seus compradores.'
                    },
                    {
                        text: 'Sempre encontrará Agências Mercado Livre perto do seu endereço.'
                    },
                    {
                        text: 'Nas agências, você terá atendimento preferencial e horário estendido.'
                    },
                    {
                        text: 'Estará mais perto de ser um MercadoLíder e fazer parte do Mercado Envios Full.',
                        links: [
                            {
                                text: 'MercadoLíder',
                                URL: 'https://www.mercadolivre.com.br/ajuda/como-se-tornar-mercadolider_864'
                            },
                            {
                                text: 'Mercado Envios Full',
                                URL: 'https://envios.mercadolivre.com.br/mercado-envios-full'
                            }
                        ]
                    }
                ]);
                LandingPage.checkStateTitle('Você deve abrir sua empresa em São Paulo');
                LandingPage.checkStateSubtitle(`Como vai precisar emitir as notas fiscais das suas vendas, abra sua empresa e informe pra gente o CNPJ até ${limitDate} para que seus anúncios não sejam pausados.O processo pode demorar até 45 dias, então o ideal é que você comece hoje mesmo.Para te apoiar, preparamos um material com informações para abrir sua empresa.`,
                    {
                        text: 'material com informações para abrir sua empresa',
                        URL: 'https://vendedores.mercadolivre.com.br/nota/abra-sua-empresa-e-utilize-os-servicos-de-envios-do-mercado-livre/'
                    });
                LandingPage.checkHowToTitle('Como fazer seus envios nas Agências Mercado Livre?');
                LandingPage.checkHowToSteps([
                    {
                        text: 'Emita as NF-e das suas vendas. Você pode fazer isso de maneira massiva com nosso emissor gratuito.',
                        links: [
                            {
                                text: 'nosso emissor gratuito',
                                URL: 'https://mercadolivre.com.br/emitir-nota-fiscal'
                            }
                        ]
                    },
                    {
                        text: 'Imprima as etiquetas de envio.'
                    },
                    {
                        text: 'Você leva seus pacotes à Agência Mercado Livre mais próxima.'
                    },
                    {
                        text: 'Nós buscamos os pacotes na agência e levamos ao nosso centro logístico.'
                    },
                    {
                        text: 'Escolhemos a melhor transportadora para que seus compradores recebam os pacotes o mais rápido possível.'
                    }
                ]);
                LandingPage.checkWarningText('Para emitir NF-e, você precisa ter um CNPJ habilitado na Sefaz para emitir notas fiscais, uma Inscrição Estadual e um certificado digital.');
                LandingPage.checkMiddleActionTitle(`Você só tem ${daysToLimit} dias para ativar seus envios nas Agências Mercado Livre`);
                LandingPage.checkMiddleActionButtonContent('Ativar envios nas agências');
                LandingPage.checkFAQsTitle('Perguntas frequentes');
                LandingPage.checkFAQsContent([
                    {
                        title: 'Quando começo a fazer meus envios nas Agências Mercado Livre?',
                        text: 'Você começará a fazer envios nas Agências Mercado Livre um dia depois de informar seu CNPJ.'
                    },
                    {
                        title: 'Podem me ajudar a abrir uma empresa?',
                        text: `Com certeza! Queremos te apoiar em todo o processo. Por isso, preparamos um material com todas as informações para abrir sua empresa.Nele você encontra tudo o que precisa saber sobre a abertura, emissão de notas fiscais e até o contato dos nossos parceiros de contabilidade digital. Como o processo pode demorar até 45 dias, o ideal é que você comece hoje mesmo já que você tem até ${limitDate} para informar seu CNPJ pra gente.`,
                        links: [
                            {
                                text: 'material com todas as informações para abrir sua empresa',
                                URL: 'https://vendedores.mercadolivre.com.br/nota/abra-sua-empresa-e-utilize-os-servicos-de-envios-do-mercado-livre/'
                            }
                        ]
                    },
                    {
                        title: 'Onde encontro as Agências Mercado Livre?',
                        text: 'Você pode encontrar as agências mais próximas do seu endereço no mapa de agências.',
                        links: [
                            {
                                text: 'mapa de agências',
                                URL: 'https://envios.mercadolivre.com.br/agenciesList/showAgenciesMap?NZXRrf9zzJ'
                            }
                        ]
                    },
                    {
                        title: 'Por que tenho que emitir as notas fiscais?',
                        text: 'Você deve emitir a nota fiscal porque as transportadoras precisam dela para enviar seu pacote. Se você não emiti-la, não poderá imprimir a etiqueta e isso vai gerar uma má experiência para seus compradores. Além disso, seus anúncios com o Mercado Envios serão pausados.'
                    },
                    {
                        title: 'Como emito minhas NF-e?',
                        text: 'Para emitir NF-e, você precisa habilitar seu CNPJ no site da Sefaz para emitir notas fiscais, um certificado digital e um emissor de NF-e.Você pode emitir suas NF-e gratuitamente e sem sair da tela de vendas com o nosso emissor de NF-e. Caso decida usar outro sistema, também poderá informar os dados das suas vendas através de um arquivo no formato XML.',
                        links: [
                            {
                                text: 'nosso emissor de NF-e',
                                URL: 'https://www.mercadolivre.com.br/emitir-nota-fiscal/'
                            }
                        ]
                    },
                    {
                        title: 'Não tenho uma ferramenta para emitir NF-e. Podem me ajudar?',
                        text: 'Sim, quando você mudar sua conta para empresa, poderá emitir Notas Fiscais eletrônicas em massa e gratuitamente usando nosso emissor integrado de NF-e.',
                        links: [
                            {
                                text: 'nosso emissor integrado de NF-e',
                                URL: 'https://www.mercadolivre.com.br/emitir-nota-fiscal/?utm_source=onboarding_places_cpf_landing&utm_content=faq'
                            }
                        ]
                    },
                    {
                        title: 'Posso emitir as NF-e das minhas vendas sendo MEI?',
                        text: 'Depende. Se você é MEI, pode emitir NF-e apenas se tiver o número de Inscrição Estadual (IE) no seu registro. Caso não tenha, terá que emitir NFA-e, seguindo os passos detalhados para o seu estado.',
                        links: [
                            {
                                text: 'passos detalhados para o seu estado',
                                URL: 'https://www.mercadolivre.com.br/ajuda/19833'
                            }
                        ]
                    },
                    {
                        title: 'Quanto tempo terei para despachar meus pacotes?',
                        text: 'Terá que despachar seus pacotes no mesmo dia ou no dia seguinte para que cheguem aos seus compradores no prazo.'
                    },
                    {
                        title: 'Minhas etiquetas de envio vão mudar?',
                        text: 'Sim. As etiquetas terão um código QR que vai agilizar o processo de envio e as entregas. Você deverá enviar pelas agências todos os pacotes que tenham as etiquetas com o nome "Agência Mercado Livre", independentemente do logo da transportadora que tenha impresso.'
                    },
                    {
                        title: 'Como vou reconhecer as agências que recebem meus pacotes?',
                        text: 'Elas estarão identificadas com o logo do Mercado Livre e o símbolo de um pacote.'
                    },
                    {
                        title: 'Vou receber algum comprovante de envio?',
                        text: 'Depois de fazer o envio, você receberá um comprovante por e-mail com o número de pacotes que deixou, o horário e o local. Além disso, pela sua conta no Mercado Livre, você poderá rastrear os envios.'
                    },
                    {
                        title: `Poderei despachar pacotes nos Correios depois de ${activationDate}?`,
                        text: 'Não. Como suas etiquetas de envio vão mudar, os Correios já não vão mais aceitar os seus pacotes. Você deverá despachá-los na Agência Mercado Livre que preferir.'
                    },
                    {
                        title: 'Posso ter embalagens do Mercado Envios?',
                        text: 'Sim. Você pode comprar as embalagens e outros materiais na Loja Oficial do Mercado Envios.',
                        links: [
                            {
                                text: 'Loja Oficial do Mercado Envios',
                                URL: 'https://loja.mercadolivre.com.br/mercado-envios'
                            }
                        ]
                    },
                    {
                        title: 'O que acontecerá com os meus anúncios no Mercado Envios Full?',
                        text: 'Nada vai mudar com eles. Você pode seguir normalmente com os seus anúncios no Mercado Envios Full.'
                    }
                ]);
                LandingPage.checkLastActionText('Estamos comprometidos com o seu crescimento.\nVamos construir juntos grandes experiências de compra.');
                LandingPage.checkLastActionButtonContent('Ativar envios nas agências');
                LandingPage.checkLastActionLinkContent('Ver termos e condições', 'https://www.mercadolivre.com.br/ajuda/terminos-y-condiciones-de-uso_1500');
            });
        });

        describe('Validate hub content', () => {
            before(() => {
                cy.setFlow(buildFlowData(
                    'MLB',
                    'PLACES',
                    'MIGRATION',
                    true,
                    true,
                    'MULTIPLE',
                    'CPF'
                ));
                cy.replaceUser();
            });

            it('Initial state', () => {
                let state = Cypress.env('state');

                cy.access('hub');

                HubPage.checkHeaderTitle('Ative seu envio nas Agências Mercado Livre');
                HubPage.checkHeaderSubtitle(`Conclua as etapas antes de ${translate(Cypress.env('flowData')['limit_date'])} para evitar que seus anúncios sejam pausados. Restam ${difference(Cypress.env('flowData')['limit_date'])} dias.`);
                HubPage.checkHelpButton('Preciso de ajuda');
                HubPage.checkStepsContent([
                    {
                        status: 'INITIAL',
                        title: `Informe o CNPJ da sua empresa em ${state} e comece a fazer seus envios nas Agências Mercado Livre no dia seguinte`,
                        text: `Ao fazer seus envios nas agências, você deve emitir as notas fiscais das suas vendas. Para isso, precisa ter um CNPJ de ${state} e um certificado digital.`,
                        buttons: [
                            'Informar CNPJ',
                            'Não tenho empresa'
                        ]
                    }
                ]);
                HubPage.checkFooterLinkContent('Mais informações sobre agências Mercado Livre');
            });

            it('Warning state', () => {
                cy.changeDate('activation_date', format(todayPlus(6)));
                cy.changeDate('limit_date', format(todayPlus(5)));

                let state = Cypress.env('state');

                cy.access('hub');

                HubPage.checkHeaderTitle('Ative seu envio nas Agências Mercado Livre');
                HubPage.checkHeaderWarningMessage(`Conclua as etapas antes de ${translate(todayPlus(5))} para evitar que seus anúncios sejam pausados. Restam ${difference(todayPlus(5))} dias.`);
                HubPage.checkHelpButton('Preciso de ajuda');
                HubPage.checkStepsContent([
                    {
                        status: 'INITIAL',
                        title: `Informe o CNPJ da sua empresa em ${state} e comece a fazer seus envios nas Agências Mercado Livre no dia seguinte`,
                        text: `Ao fazer seus envios nas agências, você deve emitir as notas fiscais das suas vendas. Para isso, precisa ter um CNPJ de ${state} e um certificado digital.`,
                        buttons: [
                            'Informar CNPJ',
                            'Não tenho empresa'
                        ]
                    }
                ]);
                HubPage.checkFooterLinkContent('Mais informações sobre agências Mercado Livre');
            });

            it('Congrats state', () => {
                cy.completeStep('CDT');

                let state = Cypress.env('state');

                cy.access('hub');

                HubPage.checkHeaderTitle('Você ativou o envio nas Agências Mercado Livre');
                HubPage.checkHeaderSubtitle('Quase tudo pronto! Conclua as tarefas adicionais para uma experiência de envios ainda melhor.');
                HubPage.checkHelpButton('Preciso de ajuda');
                HubPage.checkCongratsTitle(`Pronto! A partir de ${translate(Cypress.env('flowData')['activation_date'])}, você fará envios nas Agências Mercado Livre`);
                HubPage.checkCongratsSubtitle('Para despachar suas vendas, você deverá emitir as notas fiscais antes de imprimir as etiquetas de envio. Depois, é só preparar os pacotes e levar à agência mais próxima.');
                HubPage.checkStepsContent([
                    {
                        status: 'COMPLETE',
                        title: `Informe o CNPJ da sua empresa em ${state} e comece a fazer seus envios nas Agências Mercado Livre no dia seguinte`,
                        text: `Ao fazer seus envios nas agências, você deve emitir as notas fiscais das suas vendas. Para isso, precisa ter um CNPJ de ${state} e um certificado digital.`
                    },
                    {
                        status: 'INITIAL',
                        title: 'Configure nosso emissor de Notas Fiscais eletrônicas',
                        text: 'Emita suas NF-e de forma prática e sem sair do seu painel de vendas. Para usar o emissor, você precisa de um certificado digital A1.Lembre-se: se não emitir suas notas fiscais, você não poderá imprimir as etiquetas e isso vai gerar uma má experiência para seus compradores. Por isso, seus anúncios serão pausados.',
                        buttons: [
                            'Configurar emissor gratuito',
                            'Saber mais sobre o emissor'
                        ]
                    },
                    {
                        status: 'INITIAL',
                        title: 'Atualize seu endereço do Mercado Envios',
                    }
                ]);
                HubPage.checkFooterLinkContent('Mais informações sobre agências Mercado Livre');
            });

            it('Suspension state', () => {
                cy.setFlow(buildFlowData(
                    'MLB',
                    'PLACES',
                    'MIGRATION',
                    true,
                    true,
                    'MULTIPLE',
                    'CPF'
                ));
                cy.injectUser();
                cy.changeDate('activation_date', format(todayPlus(-4)));
                cy.changeDate('limit_date', format(todayPlus(-5)));
                cy.suspend('CDT');

                let state = Cypress.env('state');

                cy.access('hub');

                HubPage.checkHeaderTitle('Ative seu envio nas Agências Mercado Livre');
                HubPage.checkHeaderSuspensionMessage('Conclua as tarefas pendentes para reativar seus anúncios com Mercado Envios.');
                HubPage.checkHelpButton('Preciso de ajuda');
                HubPage.checkStepsContent([
                    {
                        status: 'INITIAL',
                        title: `Informe o CNPJ da sua empresa em ${state} e comece a fazer seus envios nas Agências Mercado Livre no dia seguinte`,
                        text: `Ao fazer seus envios nas agências, você deve emitir as notas fiscais das suas vendas. Para isso, precisa ter um CNPJ de ${state} e um certificado digital.`,
                        buttons: [
                            'Informar CNPJ',
                            'Não tenho empresa'
                        ]
                    }
                ]);
                HubPage.checkFooterLinkContent('Mais informações sobre agências Mercado Livre');
            });

            it('Autorecovery state', () => {
                cy.completeStep('CDT');

                let state = Cypress.env('state');

                cy.access('hub');

                HubPage.checkHeaderTitle('Você ativou o envio nas Agências Mercado Livre');
                HubPage.checkHeaderSubtitle('Quase tudo pronto! Conclua as tarefas adicionais para uma experiência de envios ainda melhor.');
                HubPage.checkHelpButton('Preciso de ajuda');
                HubPage.checkCongratsTitle('Já reativamos seus anúncios');
                HubPage.checkCongratsSubtitle('Todas as suas vendas a partir de hoje, você deve despachá-las nas Agências Mercado Livre perto do seu endereço.Lembre-se de que será obrigatório emitir as notas fiscais das suas vendas para poder imprimir suas etiquetas de envio. Caso você não emita, seus anúncios serão pausados novamente.');
                HubPage.checkCongratsButton('Ir para Vendas');
                HubPage.checkStepsContent([
                    {
                        status: 'COMPLETE',
                        title: `Informe o CNPJ da sua empresa em ${state} e comece a fazer seus envios nas Agências Mercado Livre no dia seguinte`,
                        text: `Ao fazer seus envios nas agências, você deve emitir as notas fiscais das suas vendas. Para isso, precisa ter um CNPJ de ${state} e um certificado digital.`
                    },
                    {
                        status: 'INITIAL',
                        title: 'Configure nosso emissor de Notas Fiscais eletrônicas',
                        text: 'Emita suas NF-e de forma prática e sem sair do seu painel de vendas. Para usar o emissor, você precisa de um certificado digital A1.Lembre-se: se não emitir suas notas fiscais, você não poderá imprimir as etiquetas e isso vai gerar uma má experiência para seus compradores. Por isso, seus anúncios serão pausados.',
                        buttons: [
                            'Configurar emissor gratuito',
                            'Saber mais sobre o emissor'
                        ]
                    },
                    {
                        status: 'INITIAL',
                        title: 'Atualize seu endereço do Mercado Envios',
                    }
                ]);
                HubPage.checkFooterLinkContent('Mais informações sobre agências Mercado Livre');
            });
        });

        describe.skip('Validate sales message content', () => {
            before(() => {
                cy.setFlow(buildFlowData(
                    'MLB',
                    'PLACES',
                    'MIGRATION',
                    true,
                    true,
                    'MULTIPLE',
                    'CPF'
                ));
                cy.injectUser();
                cy.communicate();
            });

            it('Launch message', () => {
                cy.access('sales');

                SalesPage.checkMessageTitle('large', `Ative seus envios nas agências até ${translate(Cypress.env('flowData')['limit_date'])} para que seus anúncios não sejam pausados`);
                SalesPage.checkMessageTextContent('large', {
                    text: `Ao despachar nas Agências Mercado Livre, você vai oferecer envios mais rápidos e o processo de envio será muito mais ágil, pois as agências têm horário estendido e atendimento preferencial.Para aproveitar seu novo serviço de envios, você vai precisar abrir uma empresa em ${Cypress.env('state')} e emitir notas fiscais.Apoiamos você na abertura da sua empresa!O processo pode demorar até 45 dias, então o ideal é que você comece hoje mesmo. Como estamos juntos nessa, preparamos um material com informações para abrir sua empresa.Caso você não informe seu CNPJ até ${translate(Cypress.env('flowData')['limit_date'])}, teremos que pausar seus anúncios.`,
                    links: [
                        {
                            text: 'material com informações para abrir sua empresa',
                            URL: 'https://vendedores.mercadolivre.com.br/nota/abra-sua-empresa-e-utilize-os-servicos-de-envios-do-mercado-livre/'
                        }
                    ]
                });
                SalesPage.checkMainCTA('Ativar envio nas agências');
                SalesPage.checkSecondaryCTA('Ver mais benefícios');
            });

            it('Warning - Orange message', () => {
                cy.changeDate('activation_date', format(todayPlus(22)));
                cy.changeDate('limit_date', format(todayPlus(21)));

                cy.access('sales');

                SalesPage.checkMessageTitle('short', `Você tem ${difference(todayPlus(21))} dias para ativar o envio nas Agências Mercado Livre`);
                SalesPage.checkMessageTextContent('short', {
                    text: `Para despachar nas Agências Mercado Livre, você deve informar pra gente o CNPJ da sua empresa em ${Cypress.env('state')}. Se não fizer isso até ${translate(todayPlus(21))}, seus anúncios com Mercado Envios serão pausados.Para te apoiar, preparamos um material com informações para abrir sua empresa.`,
                    links: [
                        {
                            text: 'material com informações para abrir sua empresa',
                            URL: 'https://vendedores.mercadolivre.com.br/nota/abra-sua-empresa-e-utilize-os-servicos-de-envios-do-mercado-livre/'
                        }
                    ]
                });
                SalesPage.checkButtonGroup(['Ativar envio nas agências', 'Ver benefícios']);
            });

            it('Warning - Red message', () => {
                cy.changeDate('activation_date', format(todayPlus(6)));
                cy.changeDate('limit_date', format(todayPlus(5)));

                cy.access('sales');

                SalesPage.checkMessageTitle('large', `Em ${difference(todayPlus(5))} dias pausaremos seus anúncios se você não informar seu CNPJ`);
                SalesPage.checkMessageTextContent('large', {
                    text: `Ative o envio nas Agências Mercado Livre informando o CNPJ da sua empresa em ${Cypress.env('state')} até ${translate(todayPlus(5))} e evite que seus anúncios sejam pausados.Para apoiar você a abrir sua empresa e emitir as notas fiscais das suas vendas, preparamos um material com todas as informações.`,
                    links: [
                        {
                            text: 'material com todas as informações',
                            URL: 'https://vendedores.mercadolivre.com.br/nota/abra-sua-empresa-e-utilize-os-servicos-de-envios-do-mercado-livre/'
                        }
                    ]
                });
                SalesPage.checkAlertMainCTA('Informar CNPJ');
            });
        });
    });

    after(() => {
        cy.deleteUser();
    });
});