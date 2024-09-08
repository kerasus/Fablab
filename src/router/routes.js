import { Authenticated, SetPrimaryColor } from './middleware/middleware.js'
const fabColors = {
  fablab: '#0063AE',
  fabfactory: '#F8AF18',
  fabcafe: '#D83527',
  fabkids: '#25a74a'
}
const routes = [
  {
    path: '',
    layoutConfig: {
      layoutView: 'lHh Lpr fff',
      layoutHeader: true,
      layoutHeaderType: 'main',
      layoutHeaderVisible: true,
      layoutHeaderReveal: false,
      layoutHeaderElevated: false,
      layoutHeaderBordered: false,
      layoutLeftDrawer: true,
      layoutLeftSideBarType: 'main',
      layoutLeftDrawerVisible: false,
      layoutLeftDrawerOverlay: false,
      layoutLeftDrawerElevated: false,
      layoutLeftDrawerBordered: false,
      layoutLeftDrawerShowIfAbove: false,
      layoutLeftDrawerWidth: 325,
      layoutLeftDrawerBehavior: 'default',
      layoutRightDrawer: false,
      layoutFooter: true,
      showHamburgerBtn: true,
      layoutFooterVisible: true,
      layoutHeaderCustomClass: '',
      layoutBreadcrumbsElements: [],
      layoutBreadcrumbs: {
        separator: 'home'
      },
      layoutLeftDrawerCustomClass: 'main-layout-left-drawer',
      layoutPageContainerCustomClass: 'main-layout-container'
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Public',
        component: () => import('layouts/bareLayout.vue'),
        children: [
          {
            path: '',
            name: 'Public.Home',
            meta: {
              hasDynamicSetting: true,
              middlewares: [
                SetPrimaryColor(fabColors.fablab)
              ]
            },
            component: () => import('src/pages/Public/BasicDynamicPage.vue')
          },
          {
            path: 'packages',
            name: 'Public.Packages',
            meta: {
              hasDynamicSetting: true
            },
            component: () => import('src/pages/Public/Packages.vue')
          },
          {
            path: 'fab-group',
            name: 'Public.FabGroup',
            meta: {
              hasDynamicHeader: true,
              hasDynamicFooter: true,
              hasDynamicSetting: true
            },
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'Public.FabGroup.Index',
                meta: {
                  hasDynamicSetting: true
                },
                component: () => import('src/pages/Public/BasicDynamicPage.vue')
              },
              {
                path: 'fablab',
                name: 'Public.FabGroup.Fablab',
                meta: {
                  hasDynamicHeader: true,
                  hasDynamicFooter: true,
                  hasDynamicSetting: true,
                  middlewares: [
                    SetPrimaryColor(fabColors.fablab)
                  ]
                },
                component: () => import('layouts/bareLayout.vue'),
                children: [
                  {
                    path: '',
                    name: 'Public.FabGroup.Fablab.Index',
                    meta: {
                      hasDynamicSetting: true
                    },
                    component: () => import('src/pages/Public/BasicDynamicPage.vue')
                  },
                  {
                    path: 'post',
                    name: 'Public.FabGroup.Fablab.Post',
                    meta: {
                      hasDynamicSetting: true
                    },
                    component: () => import('src/pages/Public/BasicDynamicPage.vue')
                  },
                  {
                    path: 'post/:post_id',
                    name: 'Public.FabGroup.Fablab.Post.Show',
                    meta: {
                      hasDynamicSetting: true
                    },
                    component: () => import('src/pages/Public/BasicDynamicPage.vue')
                  },
                  {
                    path: 'post_category',
                    name: 'Public.FabGroup.Fablab.PostCategory',
                    component: () => import('layouts/bareLayout.vue'),
                    children: [
                      {
                        path: 'parent/parent/:category_id',
                        name: 'Public.FabGroup.Fablab.PostCategoryParentParent.Show',
                        meta: {
                          hasDynamicSetting: true
                        },
                        component: () => import('src/pages/Public/BasicDynamicPage.vue')
                      },
                      {
                        path: 'parent/:category_id',
                        name: 'Public.FabGroup.Fablab.PostCategoryParent.Show',
                        meta: {
                          hasDynamicSetting: true
                        },
                        component: () => import('src/pages/Public/BasicDynamicPage.vue')
                      },
                      {
                        path: ':category_id',
                        name: 'Public.FabGroup.Fablab.PostCategory.Show',
                        meta: {
                          hasDynamicSetting: true
                        },
                        component: () => import('src/pages/Public/BasicDynamicPage.vue')
                      }
                    ]
                  },
                  {
                    path: 'project',
                    name: 'Public.FabGroup.Fablab.Project',
                    meta: {
                      hasDynamicSetting: true
                    },
                    component: () => import('src/pages/Public/BasicDynamicPage.vue')
                  },
                  {
                    path: 'event',
                    name: 'Public.FabGroup.Fablab.Event',
                    meta: {
                      hasDynamicSetting: true
                    },
                    component: () => import('src/pages/Public/BasicDynamicPage.vue')
                  },
                  {
                    path: 'research',
                    name: 'Public.FabGroup.Fablab.Research',
                    meta: {
                      hasDynamicSetting: true
                    },
                    component: () => import('src/pages/Public/BasicDynamicPage.vue')
                  },
                  {
                    path: 'startup',
                    name: 'Public.FabGroup.Fablab.Startup',
                    meta: {
                      hasDynamicSetting: true
                    },
                    component: () => import('src/pages/Public/BasicDynamicPage.vue')
                  }
                ]
              },
              {
                path: 'fabfactory',
                name: 'Public.FabGroup.Fabfactory',
                meta: {
                  hasDynamicHeader: true,
                  hasDynamicFooter: true,
                  hasDynamicSetting: true,
                  middlewares: [
                    SetPrimaryColor(fabColors.fabfactory)
                  ]
                },
                component: () => import('layouts/bareLayout.vue'),
                children: [
                  {
                    path: '',
                    name: 'Public.FabGroup.Fabfactory.Index',
                    meta: {
                      hasDynamicSetting: true
                    },
                    component: () => import('src/pages/Public/BasicDynamicPage.vue')
                  },
                  {
                    path: 'post',
                    name: 'Public.FabGroup.Fabfactory.Post',
                    meta: {
                      hasDynamicSetting: true
                    },
                    component: () => import('src/pages/Public/BasicDynamicPage.vue')
                  },
                  {
                    path: 'post/:post_id',
                    name: 'Public.FabGroup.Fabfactory.Post.Show',
                    meta: {
                      hasDynamicSetting: true
                    },
                    component: () => import('src/pages/Public/BasicDynamicPage.vue')
                  },
                  {
                    path: 'post_category',
                    name: 'Public.FabGroup.Fabfactory.PostCategory',
                    component: () => import('layouts/bareLayout.vue'),
                    children: [
                      {
                        path: 'parent/parent/:category_id',
                        name: 'Public.FabGroup.Fabfactory.PostCategoryParentParent.Show',
                        meta: {
                          hasDynamicSetting: true
                        },
                        component: () => import('src/pages/Public/BasicDynamicPage.vue')
                      },
                      {
                        path: 'parent/:category_id',
                        name: 'Public.FabGroup.Fabfactory.PostCategoryParent.Show',
                        meta: {
                          hasDynamicSetting: true
                        },
                        component: () => import('src/pages/Public/BasicDynamicPage.vue')
                      },
                      {
                        path: ':category_id',
                        name: 'Public.FabGroup.Fabfactory.PostCategory.Show',
                        meta: {
                          hasDynamicSetting: true
                        },
                        component: () => import('src/pages/Public/BasicDynamicPage.vue')
                      }
                    ]
                  },
                  {
                    path: 'event',
                    name: 'Public.FabGroup.Fabfactory.Event',
                    meta: {
                      hasDynamicSetting: true
                    },
                    component: () => import('src/pages/Public/BasicDynamicPage.vue')
                  },
                  {
                    path: 'research',
                    name: 'Public.FabGroup.Fabfactory.Research',
                    meta: {
                      hasDynamicSetting: true
                    },
                    component: () => import('src/pages/Public/BasicDynamicPage.vue')
                  },
                  {
                    path: 'startup',
                    name: 'Public.FabGroup.Fabfactory.Startup',
                    meta: {
                      hasDynamicSetting: true
                    },
                    component: () => import('src/pages/Public/BasicDynamicPage.vue')
                  }
                ]
              },
              {
                path: 'fabcafe',
                name: 'Public.FabGroup.Fabcafe',
                meta: {
                  hasDynamicHeader: true,
                  hasDynamicFooter: true,
                  hasDynamicSetting: true,
                  middlewares: [
                    SetPrimaryColor(fabColors.fabcafe)
                  ]
                },
                component: () => import('layouts/bareLayout.vue'),
                children: [
                  {
                    path: '',
                    name: 'Public.FabGroup.Fabcafe.Index',
                    meta: {
                      hasDynamicSetting: true
                    },
                    component: () => import('src/pages/Public/BasicDynamicPage.vue')
                  },
                  {
                    path: 'post',
                    name: 'Public.FabGroup.Fabcafe.Post',
                    meta: {
                      hasDynamicSetting: true
                    },
                    component: () => import('src/pages/Public/BasicDynamicPage.vue')
                  },
                  {
                    path: 'post/:post_id',
                    name: 'Public.FabGroup.Fabcafe.Post.Show',
                    meta: {
                      hasDynamicSetting: true
                    },
                    component: () => import('src/pages/Public/BasicDynamicPage.vue')
                  },
                  {
                    path: 'post_category',
                    name: 'Public.FabGroup.Fabkids.PostCategory',
                    component: () => import('layouts/bareLayout.vue'),
                    children: [
                      {
                        path: 'parent/parent/:category_id',
                        name: 'Public.FabGroup.Fabkids.PostCategoryParentParent.Show',
                        meta: {
                          hasDynamicSetting: true
                        },
                        component: () => import('src/pages/Public/BasicDynamicPage.vue')
                      },
                      {
                        path: 'parent/:category_id',
                        name: 'Public.FabGroup.Fabkids.PostCategoryParent.Show',
                        meta: {
                          hasDynamicSetting: true
                        },
                        component: () => import('src/pages/Public/BasicDynamicPage.vue')
                      },
                      {
                        path: ':category_id',
                        name: 'Public.FabGroup.Fabkids.PostCategory.Show',
                        meta: {
                          hasDynamicSetting: true
                        },
                        component: () => import('src/pages/Public/BasicDynamicPage.vue')
                      }
                    ]
                  },
                  {
                    path: 'event',
                    name: 'Public.FabGroup.Fabcafe.Event',
                    meta: {
                      hasDynamicSetting: true
                    },
                    component: () => import('src/pages/Public/BasicDynamicPage.vue')
                  }

                ]
              },
              {
                path: 'fabkids',
                name: 'Public.FabGroup.Fabkids',
                meta: {
                  hasDynamicHeader: true,
                  hasDynamicFooter: true,
                  hasDynamicSetting: true,
                  middlewares: [
                    SetPrimaryColor(fabColors.fabkids)
                  ]
                },
                component: () => import('layouts/bareLayout.vue'),
                children: [
                  {
                    path: '',
                    name: 'Public.FabGroup.Fabkids.Index',
                    meta: {
                      hasDynamicSetting: true
                    },
                    component: () => import('src/pages/Public/BasicDynamicPage.vue')
                  },
                  {
                    path: 'post',
                    name: 'Public.FabGroup.Fabkids.Post',
                    meta: {
                      hasDynamicSetting: true
                    },
                    component: () => import('src/pages/Public/BasicDynamicPage.vue')
                  },
                  {
                    path: 'post/:post_id',
                    name: 'Public.FabGroup.Fabkids.Post.Show',
                    meta: {
                      hasDynamicSetting: true
                    },
                    component: () => import('src/pages/Public/BasicDynamicPage.vue')
                  },
                  {
                    path: 'post_category',
                    name: 'Public.FabGroup.Fabkids.PostCategory',
                    component: () => import('layouts/bareLayout.vue'),
                    children: [
                      {
                        path: 'parent/parent/:category_id',
                        name: 'Public.FabGroup.Fabkids.PostCategoryParentParent.Show',
                        meta: {
                          hasDynamicSetting: true
                        },
                        component: () => import('src/pages/Public/BasicDynamicPage.vue')
                      },
                      {
                        path: 'parent/:category_id',
                        name: 'Public.FabGroup.Fabkids.PostCategoryParent.Show',
                        meta: {
                          hasDynamicSetting: true
                        },
                        component: () => import('src/pages/Public/BasicDynamicPage.vue')
                      },
                      {
                        path: ':category_id',
                        name: 'Public.FabGroup.Fabkids.PostCategory.Show',
                        meta: {
                          hasDynamicSetting: true
                        },
                        component: () => import('src/pages/Public/BasicDynamicPage.vue')
                      }
                    ]
                  },
                  {
                    path: 'event',
                    name: 'Public.FabGroup.Fabkids.Event',
                    meta: {
                      hasDynamicSetting: true
                    },
                    component: () => import('src/pages/Public/BasicDynamicPage.vue')
                  }
                ]
              }
            ]
          },
          {
            path: 'about-us',
            name: 'Public.AboutUs',
            meta: {
              hasDynamicHeader: true,
              hasDynamicFooter: true,
              hasDynamicSetting: true
            },
            component: () => import('src/pages/Public/AboutUs.vue')
          },
          {
            path: 'gallery',
            name: 'Public.Gallery',
            meta: {
              hasDynamicSetting: true
            },
            component: () => import('src/pages/Public/Gallery.vue')
          },
          {
            path: 'blog',
            name: 'Public.Blog',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'Public.Blog.List',
                meta: {
                  hasDynamicSetting: true
                },
                component: () => import('src/pages/Public/BlogList.vue')
              },
              {
                path: ':id',
                name: 'Public.Blog.Show',
                meta: {
                  hasDynamicSetting: true
                },
                component: () => import('src/pages/Public/BlogShow.vue')
              }
            ]
          },
          {
            path: 'post',
            name: 'Public.Post',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'Public.Post.List',
                meta: {
                  hasDynamicSetting: true
                },
                component: () => import('src/pages/Public/BlogList.vue')
              },
              {
                path: ':id',
                name: 'Public.Post.Show',
                meta: {
                  hasDynamicSetting: true
                },
                component: () => import('src/pages/Public/BlogShow.vue')
              }
            ]
          },
          {
            path: 'post_category',
            name: 'Public.PostCategory',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: 'parent/parent/:category_id',
                name: 'Public.PostCategoryParentParent.Show',
                meta: {
                  hasDynamicSetting: true
                },
                component: () => import('src/pages/Public/BasicDynamicPage.vue')
              },
              {
                path: 'parent/:category_id',
                name: 'Public.PostCategoryParent.Show',
                meta: {
                  hasDynamicSetting: true
                },
                component: () => import('src/pages/Public/BasicDynamicPage.vue')
              },
              {
                path: ':category_id',
                name: 'Public.PostCategory.Show',
                meta: {
                  hasDynamicSetting: true
                },
                component: () => import('src/pages/Public/BasicDynamicPage.vue')
              }
            ]
          },
          {
            path: 'contact-us',
            name: 'Public.ContactUs',
            meta: {
              hasDynamicSetting: true
            },
            component: () => import('src/pages/Public/BasicDynamicPage.vue')
          }
        ]
      },
      {
        path: '/auth',
        name: 'Auth',
        layoutConfig: {
          layoutHeaderVisible: false,
          layoutHeader: false,
          layoutLeftDrawer: false,
          layoutFooter: false,
          layoutFooterVisible: false
        },
        component: () => import('layouts/bareLayout.vue'),
        children: [
          {
            path: '/login',
            name: 'Login',
            component: () => import('src/pages/Auth/Login.vue')
          },
          {
            path: '/otp-login',
            name: 'OtpLogin',
            component: () => import('pages/Auth/OtpLogin.vue')
          },
          {
            path: '/signup',
            name: 'SignUp',
            component: () => import('pages/Auth/SignUp.vue')
          }
        ]
      },
      {
        path: 'panel',
        name: 'UserPanel',
        layoutConfig: {
          layoutHeader: false,
          layoutHeaderVisible: false,
          layoutLeftDrawer: true,
          layoutLeftDrawerVisible: false,
          layoutLeftSideBarType: 'dashboard',
          layoutFooter: false,
          layoutFooterVisible: false
        },
        meta: { middlewares: [Authenticated] },
        component: () => import('src/layouts/PanelLayout.vue'),
        children: [
          {
            path: 'dashboard',
            name: 'UserPanel.Dashboard',
            component: () => import('src/pages/User/Dashboard.vue')
          },
          {
            path: 'package',
            name: 'UserPanel.Package',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: 'registered/:id',
                name: 'UserPanel.Package.Show',
                component: () => import('src/pages/User/Package/Show.vue')
              },
              {
                path: 'registeredList',
                name: 'UserPanel.Package.RegisteredList',
                component: () => import('src/pages/User/Package/RegisteredPackageList.vue')
              }
            ]
          },
          {
            path: 'roles',
            name: 'UserPanel.Role',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'UserPanel.Role.List',
                component: () => import('src/pages/User/Roles/List.vue')
              },
              {
                path: 'create',
                name: 'UserPanel.Role.Create',
                component: () => import('src/pages/User/Roles/Create.vue')
              }
            ]
          },
          {
            path: 'ticket',
            name: 'UserPanel.Ticket',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'UserPanel.Ticket.List',
                component: () => import('src/pages/User/Ticket/List.vue')
              },
              {
                path: ':id',
                name: 'UserPanel.Ticket.Show',
                component: () => import('src/pages/User/Ticket/Show.vue')
              },
              {
                path: 'create',
                name: 'UserPanel.Ticket.Create',
                component: () => import('src/pages/User/Ticket/Create.vue')
              }
            ]
          },
          {
            path: 'notice',
            name: 'UserPanel.Notice',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'UserPanel.Notice.List',
                component: () => import('src/pages/User/Notice/List.vue')
              },
              {
                path: ':id',
                name: 'UserPanel.Notice.Show',
                component: () => import('src/pages/User/Notice/Show.vue')
              }
            ]
          },
          {
            path: 'invoice',
            name: 'UserPanel.Invoice',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'UserPanel.Invoice.List',
                component: () => import('src/pages/User/Invoice/List.vue')
              },
              {
                path: 'thankyou',
                name: 'UserPanel.Invoice.Thankyou',
                component: () => import('src/pages/User/Invoice/Thankyou.vue')
              },
              {
                path: ':id',
                name: 'UserPanel.Invoice.Show',
                component: () => import('src/pages/User/Invoice/Show.vue')
              }
            ]
          },
          {
            path: 'payment',
            name: 'UserPanel.Payment',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'UserPanel.Payment.List',
                component: () => import('src/pages/User/Payment/List.vue')
              }
            ]
          },
          {
            name: 'UserPanel.Profile',
            path: 'profile',
            component: () => import('src/pages/User/Profile.vue')
          },
          {
            name: 'UserPanel.Reservation',
            path: 'reservation',
            component: () => import('src/pages/User/Reservation.vue')
          },
          {
            name: 'UserPanel.Registration',
            path: 'registration',
            component: () => import('src/pages/User/Registration.vue')
          },
          {
            name: 'UserPanel.Shop',
            path: 'shop/:shopServiceName',
            component: () => import('src/pages/User/Shop.vue')
          }
        ]
      },
      {
        path: 'admin',
        name: 'AdminPanel',
        layoutConfig: {
          layoutHeader: false,
          layoutHeaderVisible: false,
          layoutLeftDrawer: false,
          layoutLeftDrawerVisible: false,
          layoutFooter: false,
          layoutFooterVisible: false
        },
        meta: {
          hasDynamicSetting: true,
          middlewares: [Authenticated]
        },
        component: () => import('src/layouts/AdminPanelLayout.vue'),
        children: [
          {
            path: 'dashboard',
            name: 'AdminPanel.Dashboard',
            redirect: { name: 'AdminPanel.Package.List' },
            component: () => import('src/pages/Admin/Dashboard.vue')
          },
          {
            path: 'package',
            name: 'AdminPanel.Package',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'AdminPanel.Package.List',
                component: () => import('src/pages/Admin/Package/List.vue')
              },
              {
                path: ':id',
                name: 'AdminPanel.Package.Show',
                component: () => import('src/pages/Admin/Package/Show.vue')
              }
            ]
          },
          {
            path: 'event',
            name: 'AdminPanel.Event',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'AdminPanel.Event.List',
                component: () => import('src/pages/Admin/Event/List.vue')
              },
              {
                path: ':id',
                name: 'AdminPanel.Event.Show',
                component: () => import('src/pages/Admin/Event/Show.vue')
              }
            ]
          },
          {
            path: 'shop',
            name: 'AdminPanel.Shop',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: ':shopServiceName/invoice',
                name: 'AdminPanel.Shop.Invoice.List',
                meta: {
                  hasDynamicSetting: true
                },
                component: () => import('src/pages/Admin/Product/InvoiceList.vue')
              },
              {
                path: ':shopServiceName/product',
                name: 'AdminPanel.Product.List',
                component: () => import('src/pages/Admin/Product/List.vue')
              },
              {
                path: ':shopServiceName/product/:id',
                name: 'AdminPanel.Product.Show',
                component: () => import('src/pages/Admin/Product/Show.vue')
              }
            ]
          },
          {
            path: 'shop',
            name: 'AdminPanel.ProductCategory',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: ':shopServiceName/product-category/:id',
                name: 'AdminPanel.ProductCategory.Show',
                component: () => import('src/pages/Admin/ProductCategory/Show.vue')
              }
            ]
          },
          {
            path: 'blog',
            name: 'AdminPanel.Blog',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'AdminPanel.Blog.List',
                component: () => import('src/pages/Admin/Blog/List.vue')
              },
              {
                path: 'create',
                name: 'AdminPanel.Blog.Create',
                component: () => import('src/pages/Admin/Blog/Create.vue')
              },
              {
                path: ':id',
                name: 'AdminPanel.Blog.Show',
                component: () => import('src/pages/Admin/Blog/Show.vue')
              }
            ]
          },
          {
            path: 'post',
            name: 'AdminPanel.Post',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              { path: '', name: 'AdminPanel.Post.List', component: () => import('src/pages/Admin/Post/List.vue') },
              { path: 'create', name: 'AdminPanel.Post.Create', component: () => import('src/pages/Admin/Post/Create.vue') },
              { path: ':id', name: 'AdminPanel.Post.Show', component: () => import('src/pages/Admin/Post/Show.vue') }
            ]
          },
          {
            path: 'post-category',
            name: 'AdminPanel.PostCategory',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              { path: '', name: 'AdminPanel.PostCategory.List', component: () => import('src/pages/Admin/PostCategory/List.vue') },
              { path: 'create', name: 'AdminPanel.PostCategory.Create', component: () => import('src/pages/Admin/PostCategory/Create.vue') },
              { path: ':id', name: 'AdminPanel.PostCategory.Show', component: () => import('src/pages/Admin/PostCategory/Show.vue') }
            ]
          },
          {
            path: 'user',
            name: 'AdminPanel.User',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'AdminPanel.User.List',
                component: () => import('src/pages/Admin/User/List.vue')
              },
              {
                path: ':id',
                name: 'AdminPanel.User.Show',
                component: () => import('src/pages/Admin/User/Show.vue')
              }
            ]
          },
          {
            path: 'ticket',
            name: 'AdminPanel.Ticket',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'AdminPanel.Ticket.List',
                component: () => import('src/pages/Admin/Ticket/List.vue')
              },
              {
                path: 'create',
                name: 'AdminPanel.Ticket.Create',
                component: () => import('src/pages/Admin/Ticket/Create.vue')
              },
              {
                path: ':id',
                name: 'AdminPanel.Ticket.Show',
                component: () => import('src/pages/Admin/Ticket/Show.vue')
              }
            ]
          },
          {
            path: 'notice',
            name: 'AdminPanel.Notice',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'AdminPanel.Notice.List',
                component: () => import('src/pages/Admin/Notice/List.vue')
              },
              {
                path: 'create',
                name: 'AdminPanel.Notice.Create',
                component: () => import('src/pages/Admin/Notice/Create.vue')
              },
              {
                path: ':id',
                name: 'AdminPanel.Notice.Show',
                component: () => import('src/pages/Admin/Notice/Show.vue')
              }
            ]
          },
          {
            path: 'blog-category',
            name: 'AdminPanel.BlogCategory',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: 'create',
                name: 'AdminPanel.BlogCategory.Create',
                component: () => import('src/pages/Admin/BlogCategory/Create.vue')
              },
              {
                path: ':id',
                name: 'AdminPanel.BlogCategory.Show',
                component: () => import('src/pages/Admin/BlogCategory/Show.vue')
              }
            ]
          },
          {
            path: 'blog-tag',
            name: 'AdminPanel.BloTag',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: 'create',
                name: 'AdminPanel.BloTag.Create',
                component: () => import('src/pages/Admin/BlogTag/Create.vue')
              },
              {
                path: ':id',
                name: 'AdminPanel.BloTag.Show',
                component: () => import('src/pages/Admin/BlogTag/Show.vue')
              }
            ]
          },
          {
            path: 'service',
            name: 'AdminPanel.Service',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'AdminPanel.Service.List',
                component: () => import('src/pages/Admin/Service/List.vue')
              },
              {
                path: ':id',
                name: 'AdminPanel.Service.Show',
                component: () => import('src/pages/Admin/Service/Show.vue')
              }
            ]
          },
          {
            path: 'invoice',
            name: 'AdminPanel.Invoice',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'AdminPanel.Invoice.List',
                component: () => import('src/pages/Admin/Invoice/List.vue')
              },
              {
                path: ':id',
                name: 'AdminPanel.Invoice.Show',
                component: () => import('src/pages/Admin/Invoice/Show.vue')
              }
            ]
          },
          {
            path: 'payment',
            name: 'AdminPanel.Payment',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'AdminPanel.Payment.List',
                component: () => import('src/pages/Admin/Payment/List.vue')
              },
              {
                path: ':id',
                name: 'AdminPanel.Payment.Show',
                component: () => import('src/pages/Admin/Payment/Show.vue')
              }
            ]
          }
        ]
      },
      {
        path: 'document',
        name: 'Document',
        component: () => import('layouts/bareLayout.vue'),
        children: [
          {
            path: 'component',
            name: 'component',
            component: () => import('pages/Document/component.vue'),
            breadcrumbs: { title: 'component' },
            meta: {
              middlewares: [Authenticated]
            }
          },
          {
            path: 'theme',
            name: 'Document.Theme',
            component: () => import('layouts/bareLayout.vue'),
            breadcrumbs: { title: 'Theme' },
            children: [
              {
                path: 'controls',
                name: 'Document.Theme.Controls',
                component: () => import('src/pages/Document/Theme/Controls.vue'),
                breadcrumbs: { title: 'Controls' }
              }
            ]
          },
          {
            path: 'debug',
            name: 'Document.Debug',
            component: () => import('src/pages/Document/debug.vue')
          },
          {
            path: 'icon-sax',
            name: 'Document.IconSax',
            component: () => import('src/pages/Document/IconSax.vue')
          },
          {
            path: '/form-generator',
            name: 'formGenerator',
            component: () => import('pages/Document/formGenerator.vue')
          }
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component:
      () => import('pages/Error404.vue')
  }
]
export default routes
