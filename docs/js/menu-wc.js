'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">astroboy.ts</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="请输入查询关键字"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>入门指南</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>概述
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>手册
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>依赖项
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>类列表</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BaseClass.html" data-type="entity-link">BaseClass</a>
                            </li>
                            <li class="link">
                                <a href="classes/CancellationToken.html" data-type="entity-link">CancellationToken</a>
                            </li>
                            <li class="link">
                                <a href="classes/JsonResult.html" data-type="entity-link">JsonResult</a>
                            </li>
                            <li class="link">
                                <a href="classes/NormalizedMessage.html" data-type="entity-link">NormalizedMessage</a>
                            </li>
                            <li class="link">
                                <a href="classes/RealConfigCollection.html" data-type="entity-link">RealConfigCollection</a>
                            </li>
                            <li class="link">
                                <a href="classes/RenderResult.html" data-type="entity-link">RenderResult</a>
                            </li>
                            <li class="link">
                                <a href="classes/Server.html" data-type="entity-link">Server</a>
                            </li>
                            <li class="link">
                                <a href="classes/TypedSerializerCreator.html" data-type="entity-link">TypedSerializerCreator</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>可注入的</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AstroboyContext.html" data-type="entity-link">AstroboyContext</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NunjunksEngine.html" data-type="entity-link">NunjunksEngine</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Render.html" data-type="entity-link">Render</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Scope.html" data-type="entity-link">Scope</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SimpleLogger.html" data-type="entity-link">SimpleLogger</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>接口</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CancellationTokenData.html" data-type="entity-link">CancellationTokenData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CmdConfig.html" data-type="entity-link">CmdConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CommandPlugin.html" data-type="entity-link">CommandPlugin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Config.html" data-type="entity-link">Config</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Config-1.html" data-type="entity-link">Config</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigEntry.html" data-type="entity-link">ConfigEntry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigToken.html" data-type="entity-link">ConfigToken</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigurationFile.html" data-type="entity-link">ConfigurationFile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Contract.html" data-type="entity-link">Contract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Contract-1.html" data-type="entity-link">Contract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Contract-2.html" data-type="entity-link">Contract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Contract-3.html" data-type="entity-link">Contract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Contract-4.html" data-type="entity-link">Contract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Contract-5.html" data-type="entity-link">Contract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Env.html" data-type="entity-link">Env</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Env-1.html" data-type="entity-link">Env</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FactoryContext.html" data-type="entity-link">FactoryContext</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IContext.html" data-type="entity-link">IContext</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDevCmdOptions.html" data-type="entity-link">IDevCmdOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IENV.html" data-type="entity-link">IENV</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IENV-1.html" data-type="entity-link">IENV</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IErrorHandler.html" data-type="entity-link">IErrorHandler</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGlobalErrorHandler.html" data-type="entity-link">IGlobalErrorHandler</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGlobalSetOptions.html" data-type="entity-link">IGlobalSetOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IInjectableConfigs.html" data-type="entity-link">IInjectableConfigs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMiddlewaresScope.html" data-type="entity-link">IMiddlewaresScope</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InnerCmdConfig.html" data-type="entity-link">InnerCmdConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InnerRouterOptions.html" data-type="entity-link">InnerRouterOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/INunjunksRenderOptions.html" data-type="entity-link">INunjunksRenderOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPreProcess.html" data-type="entity-link">IPreProcess</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IResult.html" data-type="entity-link">IResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IResultScope.html" data-type="entity-link">IResultScope</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRouter.html" data-type="entity-link">IRouter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRouterCmdOptions.html" data-type="entity-link">IRouterCmdOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRouterMagic.html" data-type="entity-link">IRouterMagic</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISimpleLoggerOptions.html" data-type="entity-link">ISimpleLoggerOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStaticSerializeOptions.html" data-type="entity-link">IStaticSerializeOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStaticTypedResolver.html" data-type="entity-link">IStaticTypedResolver</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IView.html" data-type="entity-link">IView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IViewEngine.html" data-type="entity-link">IViewEngine</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JsonResultOptions.html" data-type="entity-link">JsonResultOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NormalizedMessageJson.html" data-type="entity-link">NormalizedMessageJson</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ParamsOptions.html" data-type="entity-link">ParamsOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RenderResultOptions.html" data-type="entity-link">RenderResultOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Request.html" data-type="entity-link">Request</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RouteArgument.html" data-type="entity-link">RouteArgument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RouterConfig.html" data-type="entity-link">RouterConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RouterConfig-1.html" data-type="entity-link">RouterConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RouterConfig-2.html" data-type="entity-link">RouterConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RouterOptions.html" data-type="entity-link">RouterOptions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>其他</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">枚举列表</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">函数</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">类型别名</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">变量</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>文档概览</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        文档生成使用 <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise-inverted.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});