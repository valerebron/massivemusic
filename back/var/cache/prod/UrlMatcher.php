<?php

/**
 * This file has been auto-generated
 * by the Symfony Routing Component.
 */

return [
    false, // $matchHost
    [ // $staticRoutes
        '/' => [[['_route' => 'home', '_controller' => 'App\\Controller\\HomeController::index'], null, null, null, false, false, null]],
        '/members' => [[['_route' => 'members', '_controller' => 'App\\Controller\\MemberController::index'], null, null, null, false, false, null]],
        '/styles' => [[['_route' => 'styles', '_controller' => 'App\\Controller\\StyleController::index'], null, null, null, false, false, null]],
        '/tracks' => [[['_route' => 'all_tracks', '_controller' => 'App\\Controller\\TrackController::index'], null, null, null, false, false, null]],
    ],
    [ // $regexpList
        0 => '{^(?'
                .'|/members/([^/]++)(*:24)'
                .'|/styles/([^/]++)(*:47)'
                .'|/tracks(?'
                    .'|/(?'
                        .'|s(?'
                            .'|ingle/([^/]++)(*:86)'
                            .'|tyle/([^/]++)(*:106)'
                        .')'
                        .'|invalidate/([^/]++)(*:134)'
                    .')'
                    .'|(?:/([^/]++))?(*:157)'
                    .'|/style(?:/([^/]++)(?:/([^/]++))?)?(*:199)'
                .')'
            .')/?$}sDu',
    ],
    [ // $dynamicRoutes
        24 => [[['_route' => 'member', '_controller' => 'App\\Controller\\MemberController::memberById'], ['id'], null, null, false, true, null]],
        47 => [[['_route' => 'style', '_controller' => 'App\\Controller\\StyleController::styleById'], ['id'], null, null, false, true, null]],
        86 => [[['_route' => 'tracks/idYt', '_controller' => 'App\\Controller\\TrackController::trackByIdYt'], ['idYt'], null, null, false, true, null]],
        106 => [[['_route' => 'tracks_style', '_controller' => 'App\\Controller\\TrackController::trackByStyle'], ['idStyle'], null, null, false, true, null]],
        134 => [[['_route' => 'tracks/invalidate', '_controller' => 'App\\Controller\\TrackController::trackInvalidate'], ['idYt'], null, null, false, true, null]],
        157 => [[['_route' => 'tracks_search', 'keyword' => '', '_controller' => 'App\\Controller\\TrackController::trackByKeyword'], ['keyword'], null, null, false, true, null]],
        199 => [
            [['_route' => 'search_style_search', 'keyword' => '', 'idStyle' => '', '_controller' => 'App\\Controller\\TrackController::trackByKeyword'], ['idStyle', 'keyword'], null, null, false, true, null],
            [null, null, null, null, false, false, 0],
        ],
    ],
    null, // $checkCondition
];
