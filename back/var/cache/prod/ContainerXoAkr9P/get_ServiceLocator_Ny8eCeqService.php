<?php

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.
// Returns the private '.service_locator.Ny8eCeq' shared service.

return $this->privates['.service_locator.Ny8eCeq'] = new \Symfony\Component\DependencyInjection\Argument\ServiceLocator($this->getService, [
    'repo' => ['privates', 'App\\Repository\\StyleRepository', 'getStyleRepositoryService.php', true],
], [
    'repo' => 'App\\Repository\\StyleRepository',
]);
