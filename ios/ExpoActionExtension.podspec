Pod::Spec.new do |s|
  s.name           = 'ExpoActionExtension'
  s.version        = '1.0.0'
  s.summary        = 'iOS Action Extension support for Expo apps'
  s.description    = 'Native module providing close, openHostApp, and clearAppGroupContainer functions for iOS Action Extensions'
  s.author         = ''
  s.homepage       = 'https://github.com/expo/expo-action-extension'
  s.platform       = :ios, '15.1'
  s.source         = { git: '' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'

  s.source_files = '*.swift'
  s.swift_version = '5.4'
end
