import { Authenticated } from './middleware/middleware.js'

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
            component: () => import('src/pages/Public/Home.vue')
          },
          {
            path: 'scenarios',
            name: 'Public.Scenario',
            component: () => import('src/pages/Public/Scenario.vue')
          },
          {
            path: 'event',
            name: 'Public.Event',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: ':id',
                name: 'Public.Event.Show',
                component: () => import('src/pages/Public/Event/Show.vue')
              }
            ]
          },
          {
            path: 'shop',
            name: 'Public.Shop',
            meta: {
              hasDynamicSetting: true
            },
            component: () => import('pages/Public/Shop.vue')
          },
          {
            path: 'product',
            name: 'Public.Product',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                name: 'Public.Product.Show',
                path: ':id',
                meta: {
                  hasDynamicSetting: true
                },
                component: () => import('pages/Public/Product/Show.vue')
              }
            ]
          },
          {
            path: 'c',
            name: 'Public.Content',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                name: 'Public.Content.Show',
                path: ':id',
                meta: {
                  hasDynamicSetting: true
                },
                component: () => import('pages/Public/Content/Show.vue')
              },
              {
                name: 'Public.Content.Search',
                path: '',
                meta: {
                  hasDynamicSetting: true
                },
                component: () => import('pages/Public/Content/Search.vue')
              }
            ]
          },
          {
            path: 'set',
            name: 'Public.Set',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                name: 'Public.Set.Show',
                path: ':id',
                meta: {
                  hasDynamicSetting: true
                },
                component: () => import('pages/Public/Set/Show.vue')
              }
            ]
          },
          {
            path: 'checkout',
            name: 'Public.Checkout',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: 'review',
                name: 'Public.Checkout.Review',
                meta: {
                  hasDynamicSetting: true
                },
                component: () => import('src/pages/Public/Cart/Cart.vue')
              }
            ]
          },
          {
            path: 'landing',
            name: 'Public.Landing',
            layoutConfig: {
              layoutHeader: false,
              layoutFooter: false
            },
            children: [
              {
                path: ':landing_name',
                meta: {
                  hasDynamicSettingWithParams: true
                },
                name: 'Public.Landing',
                component: () => import('src/pages/Public/Landings/Landing.vue')
              },
              {
                path: '36',
                name: 'Public.Landing.FireDay',
                meta: {
                  hasDynamicSetting: true
                },
                component: () => import('src/pages/Public/Landings/FireDay.vue')
              },
              {
                path: '15',
                name: 'Public.Landing.Arash',
                meta: {
                  hasDynamicSetting: true
                },
                component: () => import('src/pages/Public/Landings/Arash.vue')
              },
              {
                path: '9',
                name: 'Public.Landing.Taftan',
                meta: {
                  hasDynamicSetting: true
                },
                component: () => import('src/pages/Public/Landings/Taftan.vue')
              }
            ]
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
            component: () => import('pages/Auth/Login.vue')
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
          layoutLeftDrawer: false,
          layoutLeftDrawerVisible: false,
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
                path: ':id',
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
            // ToDo: check this to remove
            name: 'UserPanel.CompleteInfo',
            path: 'complete-info',
            component: () => import('pages/User/UserInfoForm.vue')
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
        meta: { middlewares: [Authenticated] },
        component: () => import('src/layouts/AdminPanelLayout.vue'),
        children: [
          {
            path: 'dashboard',
            name: 'AdminPanel.Dashboard',
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
            path: 'order',
            name: 'AdminPanel.Order',
            component: () => import('layouts/bareLayout.vue'),
            children: [
              {
                path: '',
                name: 'AdminPanel.Order.List',
                component: () => import('src/pages/Admin/Order/List.vue')
              },
              {
                path: ':id',
                name: 'AdminPanel.Order.Show',
                component: () => import('src/pages/Admin/Order/Show.vue')
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
  // are u mr Esmaeili ? '' : dont touch this route

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
