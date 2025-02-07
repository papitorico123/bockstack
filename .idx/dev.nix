
# Para aprender más sobre cómo usar Nix para configurar tu entorno
# consulta: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Qué canal de nixpkgs usar.
  channel = "stable-24.05"; # o "unstable"

  # Usa https://search.nixos.org/packages para encontrar paquetes
  packages = [
    # pkgs.go # Comentado porque no está en uso
    # pkgs.python311 # Comentado porque no está en uso
    # pkgs.python311Packages.pip # Comentado porque no está en uso
    pkgs.nodejs
    pkgs.nodePackages.nodemon #opcional - útil para desarrollo
  ];

  # Establece variables de entorno en el workspace
  env = {
    NUXT_GEMINI_API_KEY = "AIzaSyDaMwH_0cpS8P0o2EcqsmRlPHs9689_lJk"; # Reemplaza con tu clave API real
  };

  idx = {
    # Busca las extensiones que quieras en https://open-vsx.org/ y usa "publisher.id"
    extensions = [
      # "vscodevim.vim" # Ejemplo comentado, descomenta si lo necesitas
    ];

    # Habilitar previsualizaciones
    previews = {
      enable = true;
      previews = {
        web = {
          # Ejemplo: ejecuta "npm run dev" con PORT establecido
          # y muéstralo en el panel de previsualización web de IDX
          command = [ "npm" "run" "dev" "--" "--port" "$PORT" ];
          manager = "web";

          env = {
            # Variables de entorno para establecer para tu servidor
            PORT = "$PORT";
          };
        };
      };
    };

    # Hooks (eventos) del ciclo de vida del workspace
    workspace = {
      # Se ejecuta cuando se crea un workspace por primera vez
      onCreate = {
        # Ejemplo: instala las dependencias JS desde NPM
        npm-install = "npm install";
      };
      # Se ejecuta cuando el workspace se (re)inicia
      onStart = {
        # Ejemplo: inicia una tarea en segundo plano para observar y reconstruir el código backend
        # watch-backend = "npm run watch-backend";
      };
    };
  };
}
