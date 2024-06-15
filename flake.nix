{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    systems.url = "github:nix-systems/default";
    devenv.url = "github:cachix/devenv";
    android-nixpkgs.url = "github:tadfisher/android-nixpkgs/stable";
  };

  nixConfig = {
    extra-trusted-public-keys = "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw=";
    extra-substituters = "https://devenv.cachix.org";
  };

  outputs = { self, nixpkgs, devenv, systems, android-nixpkgs, ... } @ inputs:
    let
      forEachSystem = nixpkgs.lib.genAttrs (import systems);

      sdk = (import android-nixpkgs { }).sdk (sdkPkgs:
        with sdkPkgs; [
          build-tools-33-0-0
          build-tools-30-0-3
          cmdline-tools-latest
          emulator
      	  cmake-3-22-1
          platform-tools
          platforms-android-33
          system-images-android-32-google-apis-x86-64
	        ndk-23-1-7779620
      ]);
    in
    {
      devShells = forEachSystem
        (system:
          let
            pkgs = import nixpkgs { 
	            system = system;
	            config.allowUnfree = true;
	          };
          in
          {
            default = devenv.lib.mkShell {
              inherit inputs pkgs;
              modules = [
                {
                  packages = with pkgs; [
          		      watchman
          		      nodejs_18
          		      yarn
            		  ];

                  enterShell = ''
            		    export LD_LIBRARY_PATH="${pkgs.libglvnd}/lib";
            		    export PATH="${sdk}/bin ${sdk}/share/android-sdk/cmdline-tools/latest/bin:$PATH"
            		    export GRADLE_OPTS="-Dorg.gradle.project.android.aapt2FromMavenOverride=${sdk}/share/android-sdk/build-tools/33.0.0/aapt2"
                    ${(builtins.readFile "${sdk}/nix-support/setup-hook")}
                  '';
                }
              ];
            };
          });
    };
}
