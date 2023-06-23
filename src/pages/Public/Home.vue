<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
import { mixinPageOptions } from 'src/mixin/Mixins.js'
// import { mixinSEO, mixinPageOptions, mixinPrefetchServerData } from 'src/mixin/Mixins.js'
// import { PageSetting } from 'src/models/PageSetting'
// import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'HomePage',
  mixins: [mixinPageOptions],
  data: () => {
    return {
      sections: [
        {
          data: {
            rows: [{
              cols: [{
                widgets: [{
                  name: 'TextWidget',
                  options: {
                    fontFamily: null,
                    color: null,
                    fontSize: null,
                    fontWeight: null,
                    fontStyle: null,
                    xs: { fontSize: null, fontWeight: null, fontStyle: null },
                    sm: { fontSize: null, fontWeight: null, fontStyle: null },
                    md: { fontSize: null, fontWeight: null, fontStyle: null },
                    lg: { fontSize: null, fontWeight: null, fontStyle: null },
                    xl: { fontSize: null, fontWeight: null, fontStyle: null },
                    style: { marginTop: '400px' },
                    text: '<font color="#ffffff" size="5">هم‌اندیشی</font><div><font color="#ffffff"><font size="6"><b>یک گام از ایده تا واقعیت</b></font><br></font></div>',
                    className: ''
                  }
                }],
                options: {}
              }],
              options: {
                className: '',
                height: 'auto',
                boxed: true,
                boxedWidth: 1200,
                gutterXSize: 'md',
                gutterYSize: 'md',
                absolute: 'none',
                paddingOfBoxedInFullWidth: '30px',
                style: { maxWidth: '1200px', width: '1200px' }
              }
            }]
          },
          options: {
            fullHeight: true,
            backgrounds: {
              xs: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              sm: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              md: { size: null, color: null, image: null, repeat: null, position: null, attachment: 'fixed' },
              lg: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              xl: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }
            },
            verticalAlign: null,
            style: {
              backgroundImage: "url('/img/custom/Mask_group.png')",
              minHeight: '100vh',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundAttachment: 'scroll'
            }
          }
        },
        {
          data: {
            rows: [{
              cols: [{
                widgets: [{
                  name: 'TextWidget',
                  options: {
                    fontFamily: null,
                    color: null,
                    fontSize: null,
                    fontWeight: null,
                    fontStyle: null,
                    xs: { fontSize: null, fontWeight: null, fontStyle: null },
                    sm: { fontSize: null, fontWeight: null, fontStyle: null },
                    md: { fontSize: null, fontWeight: null, fontStyle: null },
                    lg: { fontSize: null, fontWeight: null, fontStyle: null },
                    xl: { fontSize: null, fontWeight: null, fontStyle: null },
                    style: { marginTop: '100px' },
                    text: '<div style="text-align: center;"><font color="#0b6ab1" size="6"><b style="">عضوی از کارخانه باشید</b></font></div>'
                  }
                }, {
                  name: 'TextWidget',
                  options: {
                    fontFamily: null,
                    color: null,
                    fontSize: null,
                    fontWeight: null,
                    fontStyle: null,
                    xs: { fontSize: null, fontWeight: null, fontStyle: null },
                    sm: { fontSize: null, fontWeight: null, fontStyle: null },
                    md: { fontSize: null, fontWeight: null, fontStyle: null },
                    lg: { fontSize: null, fontWeight: null, fontStyle: null },
                    xl: { fontSize: null, fontWeight: null, fontStyle: null },
                    style: { marginTop: '24px' },
                    text: '<div style="text-align: center;"><div style="text-align: center;">اگر خود را صاحب ایده‌ای می‌دانید یا حتی دوست دارید چیزی طراحی کنید و</div><div style="text-align: center;">یا بسازید، احتمالا فب‌لب جای مناسبی برای شما خواهد بود.</div><div style="text-align: center;"><br></div></div>'
                  }
                }],
                options: {}
              }],
              options: {
                className: '',
                height: 'auto',
                boxed: true,
                boxedWidth: 1200,
                gutterXSize: 'md',
                gutterYSize: 'md',
                absolute: 'none',
                paddingOfBoxedInFullWidth: '30px',
                style: { maxWidth: '1200px', width: '1200px', marginBottom: '56px' }
              }
            }, {
              cols: [{
                widgets: [{
                  name: 'FeatureBox',
                  options: { style: { marginBottom: '56px' }, title: 'کارگاه چوب', image: '/img/custom/Group181-0.png' }
                }, { name: 'FeatureBox', options: { style: {}, title: 'کارگاه فلز', image: '/img/custom/Group181-4.png' } }],
                options: { style: {}, colNumber: 'col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xl-3' }
              }, {
                widgets: [{
                  name: 'FeatureBox',
                  options: { style: { marginBottom: '56px' }, title: 'ریخته‌گری و مواد', image: '/img/custom/Group181-1.png' }
                }, { name: 'FeatureBox', options: { style: {}, title: 'چاپ و پارچه', image: '/img/custom/Group181-5.png' } }],
                options: { style: {}, colNumber: 'col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xl-3' }
              }, {
                widgets: [{
                  name: 'FeatureBox',
                  options: { style: { marginBottom: '56px' }, title: 'چاپ سه بعدی', image: '/img/custom/Group181-3.png' }
                }, { name: 'FeatureBox', options: { style: {}, title: 'برش دیجیتال', image: '/img/custom/Group181-6.png' } }],
                options: { style: {}, colNumber: 'col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xl-3' }
              }, {
                widgets: [{
                  name: 'FeatureBox',
                  options: { style: { marginBottom: '56px' }, title: 'میز اداری', image: '/img/custom/Group181-2.png' }
                }, {
                  name: 'FeatureBox',
                  options: { style: {}, title: 'طراحی سه بعدی', image: '/img/custom/Group181-7.png' }
                }],
                options: { style: {}, colNumber: 'col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xl-3' }
              }],
              options: {
                className: '',
                height: 'auto',
                boxed: true,
                boxedWidth: 1200,
                gutterXSize: 'lg',
                gutterYSize: 'xs',
                absolute: 'none',
                paddingOfBoxedInFullWidth: '30px',
                style: { maxWidth: '1200px', width: '1200px', marginTop: '', marginBottom: '' }
              }
            }]
          },
          options: {
            fullHeight: false,
            backgrounds: {
              xs: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              sm: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              md: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              lg: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              xl: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }
            },
            verticalAlign: null,
            style: { backgroundColor: 'rgba(255,255,255,1)', minHeight: 'auto', paddingBottom: '100px' }
          }
        }, {
          data: {
            rows: [{
              cols: [{
                widgets: [{
                  name: 'TextWidget',
                  options: {
                    fontFamily: null,
                    color: null,
                    fontSize: null,
                    fontWeight: null,
                    fontStyle: null,
                    xs: { fontSize: null, fontWeight: null, fontStyle: null },
                    sm: { fontSize: null, fontWeight: null, fontStyle: null },
                    md: { fontSize: null, fontWeight: null, fontStyle: null },
                    lg: { fontSize: null, fontWeight: null, fontStyle: null },
                    xl: { fontSize: null, fontWeight: null, fontStyle: null },
                    style: { marginTop: '100px', marginBottom: '4px' },
                    text: '<div style="text-align: center;"><font size="5" color="#a4a4a4">خانواده فب</font></div>'
                  }
                }, {
                  name: 'TextWidget',
                  options: {
                    fontFamily: null,
                    color: null,
                    fontSize: null,
                    fontWeight: null,
                    fontStyle: null,
                    xs: { fontSize: null, fontWeight: null, fontStyle: null },
                    sm: { fontSize: null, fontWeight: null, fontStyle: null },
                    md: { fontSize: null, fontWeight: null, fontStyle: null },
                    lg: { fontSize: null, fontWeight: null, fontStyle: null },
                    xl: { fontSize: null, fontWeight: null, fontStyle: null },
                    style: { marginBottom: '', paddingBottom: '100px' },
                    text: '<div style="text-align: center;"><b><font size="6">با دیگر اعضای کارخانه آشنا شوید</font></b></div>'
                  }
                }],
                options: {}
              }],
              options: {}
            }, {
              cols: [{
                widgets: [{
                  name: 'ImageWidget',
                  options: {
                    imageSource: '/img/custom/Logos_111.png',
                    ratio: null,
                    hasAction: false,
                    action: { name: null, route: null, scrollTo: null, eventName: null, eventArgs: null },
                    xs: { height: null, width: '150px', src: null },
                    sm: { height: null, width: null, src: null },
                    md: { height: null, width: null, src: null },
                    lg: { height: null, width: null, src: null },
                    xl: { height: null, width: null, src: null },
                    style: {}
                  }
                }],
                options: {
                  style: {},
                  colNumber: 'col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4',
                  className: 'text-center'
                }
              }, {
                widgets: [{
                  name: 'ImageWidget',
                  options: {
                    imageSource: '/img/custom/Frame_3409.png',
                    ratio: null,
                    hasAction: false,
                    action: { name: null, route: null, scrollTo: null, eventName: null, eventArgs: null },
                    xs: { height: null, width: '150px', src: null },
                    sm: { height: null, width: null, src: null },
                    md: { height: null, width: null, src: null },
                    lg: { height: null, width: null, src: null },
                    xl: { height: null, width: null, src: null },
                    style: {}
                  }
                }],
                options: {
                  style: {},
                  colNumber: 'col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4',
                  className: 'text-center'
                }
              }, {
                widgets: [{
                  name: 'ImageWidget',
                  options: {
                    imageSource: '/img/custom/Logos_23131.png',
                    ratio: null,
                    hasAction: false,
                    action: { name: null, route: null, scrollTo: null, eventName: null, eventArgs: null },
                    xs: { height: null, width: '150px', src: null },
                    sm: { height: null, width: null, src: null },
                    md: { height: null, width: null, src: null },
                    lg: { height: null, width: null, src: null },
                    xl: { height: null, width: null, src: null },
                    style: {}
                  }
                }],
                options: {
                  style: {},
                  colNumber: 'col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4',
                  className: 'text-center'
                }
              }],
              options: {
                className: '',
                height: 'auto',
                boxed: true,
                boxedWidth: 1200,
                gutterXSize: 'xl',
                gutterYSize: 'md',
                absolute: 'none',
                paddingOfBoxedInFullWidth: '30px',
                style: { maxWidth: '1200px', width: '1200px' }
              }
            }]
          },
          options: {
            fullHeight: false,
            backgrounds: {
              xs: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              sm: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              md: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              lg: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              xl: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }
            },
            verticalAlign: null,
            style: { paddingBottom: '100px', minHeight: 'auto', backgroundColor: 'rgba(246,246,246,1)' }
          }
        }, {
          data: {
            rows: [{
              cols: [{
                widgets: [{
                  name: 'TextWidget',
                  options: {
                    fontFamily: null,
                    color: null,
                    fontSize: null,
                    fontWeight: null,
                    fontStyle: null,
                    xs: { fontSize: null, fontWeight: null, fontStyle: null },
                    sm: { fontSize: null, fontWeight: null, fontStyle: null },
                    md: { fontSize: null, fontWeight: null, fontStyle: null },
                    lg: { fontSize: null, fontWeight: null, fontStyle: null },
                    xl: { fontSize: null, fontWeight: null, fontStyle: null },
                    style: {},
                    text: '<font color="#a4a4a4" size="5">گالری فب‌لب</font>'
                  }
                }, {
                  name: 'TextWidget',
                  options: {
                    fontFamily: null,
                    color: null,
                    fontSize: null,
                    fontWeight: null,
                    fontStyle: null,
                    xs: { fontSize: null, fontWeight: null, fontStyle: null },
                    sm: { fontSize: null, fontWeight: null, fontStyle: null },
                    md: { fontSize: null, fontWeight: null, fontStyle: null },
                    lg: { fontSize: null, fontWeight: null, fontStyle: null },
                    xl: { fontSize: null, fontWeight: null, fontStyle: null },
                    style: {},
                    text: '<font color="#2e2e2e" size="6"><b>کارخانه را از دریچه لنزها ببینید</b></font><br>'
                  }
                }, {
                  name: 'TextWidget',
                  options: {
                    fontFamily: null,
                    color: null,
                    fontSize: null,
                    fontWeight: null,
                    fontStyle: null,
                    xs: { fontSize: null, fontWeight: null, fontStyle: null },
                    sm: { fontSize: null, fontWeight: null, fontStyle: null },
                    md: { fontSize: null, fontWeight: null, fontStyle: null },
                    lg: { fontSize: null, fontWeight: null, fontStyle: null },
                    xl: { fontSize: null, fontWeight: null, fontStyle: null },
                    style: {},
                    text: '<font color="#2e2e2e" size="3">با توجه به رسالت کارگروه صنعت و بازار در تجاری سازی فناوری ها و محصولات فناوری نانو و به کارگیری آن‎ها در صنایع، این رو کارگروه تلاش کرده است تا با ایجاد بستری مناسب، زمینه همکاری شرکت های متقاضی صنعتی و شرکت های دارنده فناوری را آماده سازد. با توجه به رسالت کارگروه صنعت و بازار در تجاری سازی فناوری ها و محصولات فناوری نانو و به کارگیری آن‎ها در صنایع، این رو کارگروه تلاش کرده است تا با ایجاد بستری مناسب.</font><br><div><font color="#2e2e2e" size="3">با توجه به رسالت کارگروه صنعت و بازار در تجاری سازی فناوری ها و محصولات فناوری نانو و به کارگیری آن‎ها در صنایع، این رو کارگروه تلاش کرده است تا با ایجاد بستری مناسب، زمینه همکاری شرکت های متقاضی صنعتی و شرکت های دارنده فناوری را آماده سازد. با توجه به رسالت کارگروه صنعت و بازار در تجاری سازی فناوری ها و محصولات فناوری نانو و به کارگیری آن‎ها در صنایع، این رو کارگروه تلاش کرده است تا با ایجاد بستری مناسب.<br></font></div>'
                  }
                }],
                options: { style: {}, colNumber: 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' }
              }, {
                widgets: [{
                  name: 'ImageWidget',
                  options: {
                    imageSource: '/img/custom/Mask_group1.png',
                    ratio: null,
                    hasAction: false,
                    action: { name: null, route: null, scrollTo: null, eventName: null, eventArgs: null },
                    xs: { height: null, width: null, src: null },
                    sm: { height: null, width: null, src: null },
                    md: { height: null, width: null, src: null },
                    lg: { height: null, width: null, src: null },
                    xl: { height: null, width: null, src: null },
                    style: { marginBottom: '16px' }
                  }
                }, {
                  name: 'ImageWidget',
                  options: {
                    imageSource: '/img/custom/Mask_group1.png',
                    ratio: null,
                    hasAction: false,
                    action: { name: null, route: null, scrollTo: null, eventName: null, eventArgs: null },
                    xs: { height: null, width: null, src: null },
                    sm: { height: null, width: null, src: null },
                    md: { height: null, width: null, src: null },
                    lg: { height: null, width: null, src: null },
                    xl: { height: null, width: null, src: null },
                    style: { marginBottom: '16px' }
                  }
                }, {
                  name: 'ImageWidget',
                  options: {
                    imageSource: '/img/custom/Mask_group1.png',
                    ratio: null,
                    hasAction: false,
                    action: { name: null, route: null, scrollTo: null, eventName: null, eventArgs: null },
                    xs: { height: null, width: null, src: null },
                    sm: { height: null, width: null, src: null },
                    md: { height: null, width: null, src: null },
                    lg: { height: null, width: null, src: null },
                    xl: { height: null, width: null, src: null },
                    style: { marginBottom: '16px' }
                  }
                }],
                options: { style: {}, colNumber: 'col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2' }
              }, {
                widgets: [{
                  name: 'ImageWidget',
                  options: {
                    imageSource: '/img/custom/Mask_group2.png',
                    ratio: null,
                    hasAction: false,
                    action: { name: null, route: null, scrollTo: null, eventName: null, eventArgs: null },
                    xs: { height: null, width: null, src: null },
                    sm: { height: null, width: null, src: null },
                    md: { height: null, width: null, src: null },
                    lg: { height: null, width: null, src: null },
                    xl: { height: null, width: null, src: null },
                    style: { marginBottom: '16px' }
                  }
                }, {
                  name: 'ImageWidget',
                  options: {
                    imageSource: '/img/custom/Mask_group2.png',
                    ratio: null,
                    hasAction: false,
                    action: { name: null, route: null, scrollTo: null, eventName: null, eventArgs: null },
                    xs: { height: null, width: null, src: null },
                    sm: { height: null, width: null, src: null },
                    md: { height: null, width: null, src: null },
                    lg: { height: null, width: null, src: null },
                    xl: { height: null, width: null, src: null },
                    style: { marginBottom: '16px' }
                  }
                }, {
                  name: 'ImageWidget',
                  options: {
                    imageSource: '/img/custom/Mask_group2.png',
                    ratio: null,
                    hasAction: false,
                    action: { name: null, route: null, scrollTo: null, eventName: null, eventArgs: null },
                    xs: { height: null, width: null, src: null },
                    sm: { height: null, width: null, src: null },
                    md: { height: null, width: null, src: null },
                    lg: { height: null, width: null, src: null },
                    xl: { height: null, width: null, src: null },
                    style: { marginBottom: '16px' }
                  }
                }],
                options: { style: {}, colNumber: 'col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2' }
              }, {
                widgets: [{
                  name: 'ImageWidget',
                  options: {
                    imageSource: '/img/custom/Mask_group3.png',
                    ratio: null,
                    hasAction: false,
                    action: { name: null, route: null, scrollTo: null, eventName: null, eventArgs: null },
                    xs: { height: null, width: null, src: null },
                    sm: { height: null, width: null, src: null },
                    md: { height: null, width: null, src: null },
                    lg: { height: null, width: null, src: null },
                    xl: { height: null, width: null, src: null },
                    style: { marginBottom: '16px' }
                  }
                }, {
                  name: 'ImageWidget',
                  options: {
                    imageSource: '/img/custom/Mask_group3.png',
                    ratio: null,
                    hasAction: false,
                    action: { name: null, route: null, scrollTo: null, eventName: null, eventArgs: null },
                    xs: { height: null, width: null, src: null },
                    sm: { height: null, width: null, src: null },
                    md: { height: null, width: null, src: null },
                    lg: { height: null, width: null, src: null },
                    xl: { height: null, width: null, src: null },
                    style: { marginBottom: '16px' }
                  }
                }, {
                  name: 'ImageWidget',
                  options: {
                    imageSource: '/img/custom/Mask_group3.png',
                    ratio: null,
                    hasAction: false,
                    action: { name: null, route: null, scrollTo: null, eventName: null, eventArgs: null },
                    xs: { height: null, width: null, src: null },
                    sm: { height: null, width: null, src: null },
                    md: { height: null, width: null, src: null },
                    lg: { height: null, width: null, src: null },
                    xl: { height: null, width: null, src: null },
                    style: { marginBottom: '16px' }
                  }
                }],
                options: { style: {}, colNumber: 'col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2' }
              }],
              options: {
                className: '',
                height: 'auto',
                boxed: true,
                boxedWidth: 1200,
                gutterXSize: 'md',
                gutterYSize: 'md',
                absolute: 'none',
                paddingOfBoxedInFullWidth: '30px',
                style: { maxWidth: '1200px', width: '1200px' }
              }
            }]
          },
          options: {
            fullHeight: false,
            backgrounds: {
              xs: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              sm: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              md: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              lg: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              xl: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }
            },
            verticalAlign: null,
            style: {
              paddingTop: '106px',
              backgroundColor: 'rgba(255,255,255,1)',
              minHeight: 'auto',
              paddingBottom: '116px'
            }
          }
        }, {
          data: {
            rows: [{
              cols: [{
                widgets: [{
                  name: 'TextWidget',
                  options: {
                    fontFamily: null,
                    color: null,
                    fontSize: null,
                    fontWeight: null,
                    fontStyle: null,
                    xs: { fontSize: null, fontWeight: null, fontStyle: null },
                    sm: { fontSize: null, fontWeight: null, fontStyle: null },
                    md: { fontSize: null, fontWeight: null, fontStyle: null },
                    lg: { fontSize: null, fontWeight: null, fontStyle: null },
                    xl: { fontSize: null, fontWeight: null, fontStyle: null },
                    style: {},
                    text: '<div style="text-align: center;"><font color="#a4a4a4" style="" size="4">پروژه‌های فب‌لب</font><br></div>'
                  }
                }, {
                  name: 'TextWidget',
                  options: {
                    fontFamily: null,
                    color: null,
                    fontSize: null,
                    fontWeight: null,
                    fontStyle: null,
                    xs: { fontSize: null, fontWeight: null, fontStyle: null },
                    sm: { fontSize: null, fontWeight: null, fontStyle: null },
                    md: { fontSize: null, fontWeight: null, fontStyle: null },
                    lg: { fontSize: null, fontWeight: null, fontStyle: null },
                    xl: { fontSize: null, fontWeight: null, fontStyle: null },
                    style: {},
                    text: '<div style="text-align: center;"><font style="" size="5" color="#2e2e2e"><b style="">آخرین پروژه‌هایی که میزبانشان بودیم</b></font><br></div>'
                  }
                }, { name: 'BlogsByCategory' }],
                options: {}
              }],
              options: {
                className: '',
                height: 'auto',
                boxed: true,
                boxedWidth: 1200,
                gutterXSize: 'md',
                gutterYSize: 'md',
                absolute: 'none',
                paddingOfBoxedInFullWidth: '30px',
                style: { maxWidth: '1200px', width: '1200px' }
              }
            }]
          },
          options: {
            fullHeight: false,
            backgrounds: {
              xs: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              sm: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              md: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              lg: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              xl: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }
            },
            verticalAlign: null,
            style: {
              backgroundColor: 'rgba(246,246,246,1)',
              minHeight: 'auto',
              paddingTop: '100px',
              paddingBottom: '100px'
            }
          }
        }, {
          data: {
            rows: [{
              cols: [{
                widgets: [{
                  name: 'TextWidget',
                  options: {
                    fontFamily: null,
                    color: null,
                    fontSize: null,
                    fontWeight: null,
                    fontStyle: null,
                    xs: { fontSize: null, fontWeight: null, fontStyle: null },
                    sm: { fontSize: null, fontWeight: null, fontStyle: null },
                    md: { fontSize: null, fontWeight: null, fontStyle: null },
                    lg: { fontSize: null, fontWeight: null, fontStyle: null },
                    xl: { fontSize: null, fontWeight: null, fontStyle: null },
                    style: {},
                    text: '<div style="text-align: right;"><font color="#a4a4a4" size="4">بلاگ فب‌لب</font><br></div>'
                  }
                }, {
                  name: 'TextWidget',
                  options: {
                    fontFamily: null,
                    color: null,
                    fontSize: null,
                    fontWeight: null,
                    fontStyle: null,
                    xs: { fontSize: null, fontWeight: null, fontStyle: null },
                    sm: { fontSize: null, fontWeight: null, fontStyle: null },
                    md: { fontSize: null, fontWeight: null, fontStyle: null },
                    lg: { fontSize: null, fontWeight: null, fontStyle: null },
                    xl: { fontSize: null, fontWeight: null, fontStyle: null },
                    style: {},
                    text: '<div style="text-align: right;"><font color="#2e2e2e" size="5"><b>آخرین مقالات بلاگ در فب‌لب</b></font><br></div>'
                  }
                }, { name: 'LastBlogs' }],
                options: {}
              }],
              options: {
                className: '',
                height: 'auto',
                boxed: true,
                boxedWidth: 1200,
                gutterXSize: 'md',
                gutterYSize: 'md',
                absolute: 'none',
                paddingOfBoxedInFullWidth: '30px',
                style: { maxWidth: '1200px', width: '1200px' }
              }
            }]
          },
          options: {
            fullHeight: false,
            backgrounds: {
              xs: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              sm: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              md: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              lg: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              xl: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }
            },
            verticalAlign: null,
            style: {
              paddingTop: '100px',
              paddingBottom: '100px',
              backgroundColor: 'rgba(255,255,255,1)',
              minHeight: 'auto'
            }
          }
        }, {
          data: {
            rows: [{
              cols: [{
                widgets: [{
                  name: 'TextWidget',
                  options: {
                    fontFamily: null,
                    color: null,
                    fontSize: null,
                    fontWeight: null,
                    fontStyle: null,
                    xs: { fontSize: null, fontWeight: null, fontStyle: null },
                    sm: { fontSize: null, fontWeight: null, fontStyle: null },
                    md: { fontSize: null, fontWeight: null, fontStyle: null },
                    lg: { fontSize: null, fontWeight: null, fontStyle: null },
                    xl: { fontSize: null, fontWeight: null, fontStyle: null },
                    style: {},
                    text: '<div style="text-align: center;"><font size="4" color="#ffffff">از زبان شما</font><br></div>'
                  }
                }, {
                  name: 'TextWidget',
                  options: {
                    fontFamily: null,
                    color: null,
                    fontSize: null,
                    fontWeight: null,
                    fontStyle: null,
                    xs: { fontSize: null, fontWeight: null, fontStyle: null },
                    sm: { fontSize: null, fontWeight: null, fontStyle: null },
                    md: { fontSize: null, fontWeight: null, fontStyle: null },
                    lg: { fontSize: null, fontWeight: null, fontStyle: null },
                    xl: { fontSize: null, fontWeight: null, fontStyle: null },
                    style: { marginBottom: '40px' },
                    text: '<div style="text-align: center;"><font size="5" color="#ffffff"><b style="">درباره فب‌لب چه می‌گویند</b></font><br></div>'
                  }
                }, {
                  name: 'UserComment',
                  options: {
                    comment: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی',
                    user: { fullname: 'محمد راوش', title: 'طراح محصول فب‌کیب', thumbnail: '/img/custom/Mask_group2.png' },
                    style: {}
                  }
                }],
                options: {}
              }],
              options: {
                className: '',
                height: 'auto',
                boxed: true,
                boxedWidth: '916',
                gutterXSize: 'md',
                gutterYSize: 'md',
                absolute: 'none',
                paddingOfBoxedInFullWidth: '30px',
                style: { maxWidth: '916px', width: '916px' }
              }
            }]
          },
          options: {
            fullHeight: false,
            backgrounds: {
              xs: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              sm: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              md: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              lg: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              xl: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }
            },
            verticalAlign: null,
            style: { paddingBottom: '100px', paddingTop: '100px', backgroundColor: '#0B6AB1', minHeight: 'auto' }
          }
        }, {
          data: {
            rows: [{
              cols: [{
                widgets: [{
                  name: 'TextWidget',
                  options: {
                    fontFamily: null,
                    color: null,
                    fontSize: null,
                    fontWeight: null,
                    fontStyle: null,
                    xs: { fontSize: null, fontWeight: null, fontStyle: null },
                    sm: { fontSize: null, fontWeight: null, fontStyle: null },
                    md: { fontSize: null, fontWeight: null, fontStyle: null },
                    lg: { fontSize: null, fontWeight: null, fontStyle: null },
                    xl: { fontSize: null, fontWeight: null, fontStyle: null },
                    style: {},
                    text: '<div style="text-align: right;"><font color="#a4a4a4" size="4">پکیج‌ها</font><br></div>'
                  }
                }, {
                  name: 'TextWidget',
                  options: {
                    fontFamily: null,
                    color: null,
                    fontSize: null,
                    fontWeight: null,
                    fontStyle: null,
                    xs: { fontSize: null, fontWeight: null, fontStyle: null },
                    sm: { fontSize: null, fontWeight: null, fontStyle: null },
                    md: { fontSize: null, fontWeight: null, fontStyle: null },
                    lg: { fontSize: null, fontWeight: null, fontStyle: null },
                    xl: { fontSize: null, fontWeight: null, fontStyle: null },
                    style: { marginBottom: '64px' },
                    text: '<div style="text-align: right;"><font color="#2e2e2e" size="5"><b>در این کار [خانه] باشید</b></font><br></div>'
                  }
                }, { name: 'PackageList' }],
                options: {}
              }],
              options: {
                className: '',
                height: 'auto',
                boxed: true,
                boxedWidth: 1200,
                gutterXSize: 'md',
                gutterYSize: 'md',
                absolute: 'none',
                paddingOfBoxedInFullWidth: '30px',
                style: { maxWidth: '1200px', width: '1200px' }
              }
            }]
          },
          options: {
            fullHeight: false,
            backgrounds: {
              xs: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              sm: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              md: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              lg: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              xl: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }
            },
            verticalAlign: null,
            style: {
              paddingTop: '100px',
              paddingBottom: '100px',
              backgroundColor: 'rgba(255,255,255,1)',
              minHeight: 'auto'
            }
          }
        }, {
          data: {
            rows: [{
              cols: [{
                widgets: [{
                  name: 'TextWidget',
                  options: {
                    fontFamily: null,
                    color: null,
                    fontSize: null,
                    fontWeight: null,
                    fontStyle: null,
                    xs: { fontSize: null, fontWeight: null, fontStyle: null },
                    sm: { fontSize: null, fontWeight: null, fontStyle: null },
                    md: { fontSize: null, fontWeight: null, fontStyle: null },
                    lg: { fontSize: null, fontWeight: null, fontStyle: null },
                    xl: { fontSize: null, fontWeight: null, fontStyle: null },
                    style: {},
                    text: '<div style="text-align: center;"><font size="4" color="#ffffff">پرسش‌های متداول</font><br></div>'
                  }
                }, {
                  name: 'TextWidget',
                  options: {
                    fontFamily: null,
                    color: null,
                    fontSize: null,
                    fontWeight: null,
                    fontStyle: null,
                    xs: { fontSize: null, fontWeight: null, fontStyle: null },
                    sm: { fontSize: null, fontWeight: null, fontStyle: null },
                    md: { fontSize: null, fontWeight: null, fontStyle: null },
                    lg: { fontSize: null, fontWeight: null, fontStyle: null },
                    xl: { fontSize: null, fontWeight: null, fontStyle: null },
                    style: { marginBottom: '40px' },
                    text: '<div style="text-align: center;"><font size="5" color="#ffffff"><b style="">شاید پاسخ پرسش شما این‌جا باشد</b></font><br></div>'
                  }
                },
                {
                  name: 'ExpansionPanel',
                  options: {
                    expansionList: [
                      {
                        label: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ؟',
                        text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته.'
                      },
                      {
                        label: 'لورم ایپسوم متن ساختگی با تولید نامفهوم از صنعت چاپ؟',
                        text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته.'
                      },
                      {
                        label: 'لورم ایپسوم تولید سادگی نامفهوم از صنعت چاپ؟',
                        text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته.'
                      },
                      {
                        label: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ؟',
                        text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته.'
                      },
                      {
                        label: 'لورم ایپسوم متن ساختگی با تولید نامفهوم از صنعت چاپ؟',
                        text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته.'
                      },
                      {
                        label: 'لورم ایپسوم تولید سادگی نامفهوم از صنعت چاپ؟',
                        text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته.'
                      }
                    ],
                    color: 'white',
                    fontSize: '16px',
                    lineHeight: '28px'
                  }
                }
                ],
                options: {}
              }],
              options: {
                className: '',
                height: 'auto',
                boxed: true,
                boxedWidth: 1200,
                gutterXSize: 'md',
                gutterYSize: 'md',
                absolute: 'none',
                paddingOfBoxedInFullWidth: '30px',
                style: { maxWidth: '1200px', width: '1200px' }
              }
            }]
          },
          options: {
            fullHeight: false,
            backgrounds: {
              xs: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              sm: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              md: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              lg: { size: null, color: null, image: null, repeat: null, position: null, attachment: null },
              xl: { size: null, color: null, image: null, repeat: null, position: null, attachment: null }
            },
            verticalAlign: null,
            style: { paddingTop: '100px', paddingBottom: '100px', backgroundColor: '#0B6AB1', minHeight: 'auto' }
          }
        }]
    }
  },
  created() {
    this.currenSections = this.sections
  }
  // mixins: [mixinPrefetchServerData, mixinPageOptions, mixinSEO]
  // mounted () {
  //   this.currenSections = this.sections
  //   const pageSetting = new PageSetting({
  //     value: { sections: this.currenSections, seo: {}, layoutConfig: {} }
  //   })
  //   const routeName = this.$route.name
  //   // const params = JSON.stringify(this.$route.params)
  //   const key = 'route_name:' + routeName /* + '-params:' + params */
  //   const value = pageSetting.getStringifyValue()
  //   APIGateway.pageSetting.create({ key, value })
  // }
}
</script>
