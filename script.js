// ==========================================
// 1. CONFIGURAÇÃO TAILWIND
// ==========================================
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#137fec",
                "primary-gold": "#d4af37",
                "background-light": "#f6f7f8",
                "background-dark": "#101922",
            },
            fontFamily: { "display": ["Work Sans", "sans-serif"] },
            borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
        },
    },
};

// ==========================================
// 2. BANCO DE DADOS GLOBAL DE PRODUTOS
// ==========================================
const produtos = [
    // Vinhos 
    { id: 1, nome: "Château Margaux Grand Cru 2015", categoria: "vinho", label: "VINHO", preco: 145.00, precoAntigo: 180.00, tag: "Mais Vendido", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEI0pi0mmvU6skD6uZiu71J1zawmMCAv2tkAu4OIRv8B-IxbC57VpeBsoTbEBHpfMnrP-erSEHFiefpAU9x_FGY4Nx6-arj0_HKV_2IdMQbAMpNEqeF47r5bpFHC2YYSijbI4GUyXoqtO_I3OCJOlcAtJmsYCLEvYMl0GgDPgaH3oqhGi8UaesjJQ_2IwrLxu_gJqWmUqJKY2WBZyPKtnnpnr31I4IhlNyFW006oy9KDF-LwXjR48yroU05vKjjJb0PstPjrq0-7Bz" },
    { id: 2, nome: "Crimson Valley Cabernet", categoria: "vinho", label: "VINHO", preco: 89.00, precoAntigo: 110.00, tag: "Promoção", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGFWWLWL4CsWGHsJRvekmNsQuxbhtfnrukOGxx3gmzoxkFjG6Sllq99II3BNjG5s3t4cjeju8n2tPjoM-qxa2_I9m0d4oMARS-QGgLAwC6vWzHZLO0cik0QObYMvS2KPV1rZNsF33YvYb8fHt351srGoCsgoOA3zs8gt0_0WNNy1VwHamCDBzDeh91pECVf50gNTE3ug1cZoc1oAx2M3QPAm3IfUobcuQOEXQmMjKfaOzWFzkWKkOMXGdo1EjY3ADISJWXw4YaYPxa" },
    { id: 3, nome: "Malbec Reserva Especial", categoria: "vinho", label: "VINHO", preco: 120.50, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEI0pi0mmvU6skD6uZiu71J1zawmMCAv2tkAu4OIRv8B-IxbC57VpeBsoTbEBHpfMnrP-erSEHFiefpAU9x_FGY4Nx6-arj0_HKV_2IdMQbAMpNEqeF47r5bpFHC2YYSijbI4GUyXoqtO_I3OCJOlcAtJmsYCLEvYMl0GgDPgaH3oqhGi8UaesjJQ_2IwrLxu_gJqWmUqJKY2WBZyPKtnnpnr31I4IhlNyFW006oy9KDF-LwXjR48yroU05vKjjJb0PstPjrq0-7Bz" },
    { id: 4, nome: "Pinot Noir Elegance", categoria: "vinho", label: "VINHO", preco: 95.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGFWWLWL4CsWGHsJRvekmNsQuxbhtfnrukOGxx3gmzoxkFjG6Sllq99II3BNjG5s3t4cjeju8n2tPjoM-qxa2_I9m0d4oMARS-QGgLAwC6vWzHZLO0cik0QObYMvS2KPV1rZNsF33YvYb8fHt351srGoCsgoOA3zs8gt0_0WNNy1VwHamCDBzDeh91pECVf50gNTE3ug1cZoc1oAx2M3QPAm3IfUobcuQOEXQmMjKfaOzWFzkWKkOMXGdo1EjY3ADISJWXw4YaYPxa" },
    { id: 5, nome: "Chardonnay Blanc de Blancs", categoria: "vinho", label: "VINHO", preco: 115.00, tag: "Novo", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEI0pi0mmvU6skD6uZiu71J1zawmMCAv2tkAu4OIRv8B-IxbC57VpeBsoTbEBHpfMnrP-erSEHFiefpAU9x_FGY4Nx6-arj0_HKV_2IdMQbAMpNEqeF47r5bpFHC2YYSijbI4GUyXoqtO_I3OCJOlcAtJmsYCLEvYMl0GgDPgaH3oqhGi8UaesjJQ_2IwrLxu_gJqWmUqJKY2WBZyPKtnnpnr31I4IhlNyFW006oy9KDF-LwXjR48yroU05vKjjJb0PstPjrq0-7Bz" },
    { id: 21, nome: "Sauvignon Blanc Refresh", categoria: "vinho", label: "VINHO", preco: 78.90, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGFWWLWL4CsWGHsJRvekmNsQuxbhtfnrukOGxx3gmzoxkFjG6Sllq99II3BNjG5s3t4cjeju8n2tPjoM-qxa2_I9m0d4oMARS-QGgLAwC6vWzHZLO0cik0QObYMvS2KPV1rZNsF33YvYb8fHt351srGoCsgoOA3zs8gt0_0WNNy1VwHamCDBzDeh91pECVf50gNTE3ug1cZoc1oAx2M3QPAm3IfUobcuQOEXQmMjKfaOzWFzkWKkOMXGdo1EjY3ADISJWXw4YaYPxa" },
    { id: 22, nome: "Merlot Reserva Familiar", categoria: "vinho", label: "VINHO", preco: 135.00, tag: "Mais Vendido", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEI0pi0mmvU6skD6uZiu71J1zawmMCAv2tkAu4OIRv8B-IxbC57VpeBsoTbEBHpfMnrP-erSEHFiefpAU9x_FGY4Nx6-arj0_HKV_2IdMQbAMpNEqeF47r5bpFHC2YYSijbI4GUyXoqtO_I3OCJOlcAtJmsYCLEvYMl0GgDPgaH3oqhGi8UaesjJQ_2IwrLxu_gJqWmUqJKY2WBZyPKtnnpnr31I4IhlNyFW006oy9KDF-LwXjR48yroU05vKjjJb0PstPjrq0-7Bz" },
    { id: 23, nome: "Rosé de Provence", categoria: "vinho", label: "VINHO", preco: 105.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGFWWLWL4CsWGHsJRvekmNsQuxbhtfnrukOGxx3gmzoxkFjG6Sllq99II3BNjG5s3t4cjeju8n2tPjoM-qxa2_I9m0d4oMARS-QGgLAwC6vWzHZLO0cik0QObYMvS2KPV1rZNsF33YvYb8fHt351srGoCsgoOA3zs8gt0_0WNNy1VwHamCDBzDeh91pECVf50gNTE3ug1cZoc1oAx2M3QPAm3IfUobcuQOEXQmMjKfaOzWFzkWKkOMXGdo1EjY3ADISJWXw4YaYPxa" },
    
    // Destilados 
    { id: 6, nome: "Highland Reserve 12 Anos", categoria: "destilados", label: "DESTILADO", preco: 299.99, tag: "Mais Vendido", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeMVXsryX_maWwvCCNqY79WuOBORz2z5rDA1dwzF-W1EBEHyOtsrhavVUHftr20nWQf492Y6Xyuv9gyF4GWvH9SODo2NLdPXhnnlYGIuTaTXWxlQpf2iXtWTMXvI2r_xRs_HlmBeND29Rk8ySXu1s4j8KD6Pdq_Ch8KQX20nAK7DPQvsMjKse1VGP3A5RZfAD1MRf2zDMN8RBRMZk4BBPDUpA3oZxqmFEaAEkvnGGpXzK7XaHtzH32HyLIeoa7G0h3ur-Fych03d0b" },
    { id: 7, nome: "Botanical Bliss Gin", categoria: "destilados", label: "DESTILADO", preco: 189.50, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCb7LsaaXp09THdtf5dMNCDhpSdjpaB7EBKb-Js75QXWUT-g4-wVDq4b7oq4XjpcxhqkpZAba_I_DYu2Par2QLMpc4u-uNAzlsM0w-XbRmy3W57crtmyVLz_faedVucZZsswR67eFjnbna3QqknTJ1gUMRtYIJHPc_iJLfKcVTBfyiAfT57QY5GTH2YLIgIiL8ZWtqr-PC3t_wYz3gdFtju839EQ-JeXgMCljI_-SC_SSevRhweIKMPh1rzOqlrMcWu0L-zfPJWt36m" },
    { id: 8, nome: "Vodka Premium Crystal", categoria: "destilados", label: "DESTILADO", preco: 140.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNVtKUJoRtRndmOBmgJfVo_bbYXa0DGtGTewUCneFlry8ZrKVUeWC91NhBD687zoCeuzK_27CKJ5HLmyNI48bTPED56ltc9HtBYa5nsiAKkqI3TkBpDkXSkuve-WOQgOqPeymr-ncKD2FYc_FPSo4eJgOCP9C_Ge74Tz587MzMT-xaM5lzsjAHB-riIoajVuyvIXxdx_W-MFMDIEYaWZX7a3ubPZG3-toUkGDjT9jzVvFy5sW-iRtMIEJyWINPB7_DE-QHHzQR2vTt" },
    { id: 9, nome: "Rum Envelhecido 8 Anos", categoria: "destilados", label: "DESTILADO", preco: 175.00, tag: "Últimas Unidades", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeMVXsryX_maWwvCCNqY79WuOBORz2z5rDA1dwzF-W1EBEHyOtsrhavVUHftr20nWQf492Y6Xyuv9gyF4GWvH9SODo2NLdPXhnnlYGIuTaTXWxlQpf2iXtWTMXvI2r_xRs_HlmBeND29Rk8ySXu1s4j8KD6Pdq_Ch8KQX20nAK7DPQvsMjKse1VGP3A5RZfAD1MRf2zDMN8RBRMZk4BBPDUpA3oZxqmFEaAEkvnGGpXzK7XaHtzH32HyLIeoa7G0h3ur-Fych03d0b" },
    { id: 10, nome: "Tequila Reposado Ouro", categoria: "destilados", label: "DESTILADO", preco: 210.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFd3PPY1IwQDdEk-28HN7WupV7C2uKBvV2BwbBoXXih8nmbxshiYV1dqXLyEEwyGFF_FcffbMaRGSIbvomGNgJtIIa0WZLgXa_qCw9iaovX7mSkI45iOBpL0T_50ud0Gk3Xapv_KCv_bVdsSvqXw9Q4ALmWqLM--D6B0ILrHNQNNUT560e1YFTwMkOH6Ka7n_Mn5-mXvu8eYCMAIQ4ip-EBWfXt37JFoxz3CtDtUWkaKp1utfbk8MhaaYe-vl836u5ka9OspsK8UOr" },
    { id: 24, nome: "Cognac XO Imperial", categoria: "destilados", label: "DESTILADO", preco: 450.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeMVXsryX_maWwvCCNqY79WuOBORz2z5rDA1dwzF-W1EBEHyOtsrhavVUHftr20nWQf492Y6Xyuv9gyF4GWvH9SODo2NLdPXhnnlYGIuTaTXWxlQpf2iXtWTMXvI2r_xRs_HlmBeND29Rk8ySXu1s4j8KD6Pdq_Ch8KQX20nAK7DPQvsMjKse1VGP3A5RZfAD1MRf2zDMN8RBRMZk4BBPDUpA3oZxqmFEaAEkvnGGpXzK7XaHtzH32HyLIeoa7G0h3ur-Fych03d0b" },
    { id: 25, nome: "Licor de Ervas Finas", categoria: "destilados", label: "DESTILADO", preco: 110.00, tag: "Promoção", precoAntigo: 140.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCb7LsaaXp09THdtf5dMNCDhpSdjpaB7EBKb-Js75QXWUT-g4-wVDq4b7oq4XjpcxhqkpZAba_I_DYu2Par2QLMpc4u-uNAzlsM0w-XbRmy3W57crtmyVLz_faedVucZZsswR67eFjnbna3QqknTJ1gUMRtYIJHPc_iJLfKcVTBfyiAfT57QY5GTH2YLIgIiL8ZWtqr-PC3t_wYz3gdFtju839EQ-JeXgMCljI_-SC_SSevRhweIKMPh1rzOqlrMcWu0L-zfPJWt36m" },
    { id: 26, nome: "Bourbon Double Oak", categoria: "destilados", label: "DESTILADO", preco: 245.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFd3PPY1IwQDdEk-28HN7WupV7C2uKBvV2BwbBoXXih8nmbxshiYV1dqXLyEEwyGFF_FcffbMaRGSIbvomGNgJtIIa0WZLgXa_qCw9iaovX7mSkI45iOBpL0T_50ud0Gk3Xapv_KCv_bVdsSvqXw9Q4ALmWqLM--D6B0ILrHNQNNUT560e1YFTwMkOH6Ka7n_Mn5-mXvu8eYCMAIQ4ip-EBWfXt37JFoxz3CtDtUWkaKp1utfbk8MhaaYe-vl836u5ka9OspsK8UOr" },

    // Cervejas 
    { id: 11, nome: "Hazy Horizon IPA - Pack 6", categoria: "cerveja", label: "CERVEJA", preco: 74.99, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBt7rci-cosEmK9Q37bsfza8jXF7AhwMzAyDg676MDvg4mMmRuelXYOA6H9BumldPzIFV46DgQEPV83L_j3z5J0H5UIYx8r8USqf43Ak6AG_Z_V04ouVqf3gmGnkDYm_NzF3zJ4pfaP_auDjKkV4avWh3jK8MarlHTftgClCOEzmPIyYck-ohdkTUgg3G6NJb2soG9tZWSR-3HAJBhYAldELLR1_litGXoUGydYshDJ2mh3ur6sNQZmLw7UFIHtPfjsc7PXIR0vokaL" },
    { id: 12, nome: "Stout Imperial Escura", categoria: "cerveja", label: "CERVEJA", preco: 25.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFtMhn37Sv8TaPXGAhuMzMIp6_4-MkBkKcvkaqfdHy0DkjB03tS_fPKcWa7K6lChBqxPzffsea3ACg-mi-1H-X606L70nrA3Wqs9UjrSkx-SJ7cYrPTRa5YBYYD9hnmCQkD8Xsug8HJTXcT-OuYJpJhv62qzBtsapL3MzrldkRfGNHE5lXp06vTihHx_UF2vILgQQMcTaBOZGmva0J20GShyUxF8dWQCk7nN8uweb7JBi9t2e6Je57asv5VwE6gy4MAtqclNFBMMke" },
    { id: 13, nome: "Pilsen Artesanal Leve", categoria: "cerveja", label: "CERVEJA", preco: 18.50, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_zBhMmoVQyhdFTGbsV-odjcE63JL3SX610jrCeDv7lo8kBpC8JwZHqt-g9uQX4-c3JSiIkIwNO6Yh4IlDWXwT7Y1Ry2PTN790typ6armmc8pXXcJAn4urSVaS3FFV7O_V3gZ7qE43ov9A949ddnfJbltbesATNXsx3FHGut-HC4-A7KzUMIxZgRPnSy0BuxfHS2mgbWTD6D7gfvU_Qlc_naQixLkSycO-8evNvP0SLe5MtcEwqIntDNOOdIXi4acXyL-flJB9YUzR" },
    { id: 14, nome: "Weissbier Trigo Puro", categoria: "cerveja", label: "CERVEJA", preco: 22.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFtMhn37Sv8TaPXGAhuMzMIp6_4-MkBkKcvkaqfdHy0DkjB03tS_fPKcWa7K6lChBqxPzffsea3ACg-mi-1H-X606L70nrA3Wqs9UjrSkx-SJ7cYrPTRa5YBYYD9hnmCQkD8Xsug8HJTXcT-OuYJpJhv62qzBtsapL3MzrldkRfGNHE5lXp06vTihHx_UF2vILgQQMcTaBOZGmva0J20GShyUxF8dWQCk7nN8uweb7JBi9t2e6Je57asv5VwE6gy4MAtqclNFBMMke" },
    { id: 15, nome: "Red Ale Intensa", categoria: "cerveja", label: "CERVEJA", preco: 26.00, tag: "Promoção", precoAntigo: 32.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBt7rci-cosEmK9Q37bsfza8jXF7AhwMzAyDg676MDvg4mMmRuelXYOA6H9BumldPzIFV46DgQEPV83L_j3z5J0H5UIYx8r8USqf43Ak6AG_Z_V04ouVqf3gmGnkDYm_NzF3zJ4pfaP_auDjKkV4avWh3jK8MarlHTftgClCOEzmPIyYck-ohdkTUgg3G6NJb2soG9tZWSR-3HAJBhYAldELLR1_litGXoUGydYshDJ2mh3ur6sNQZmLw7UFIHtPfjsc7PXIR0vokaL" },
    { id: 27, nome: "Pale Ale Tradicional", categoria: "cerveja", label: "CERVEJA", preco: 21.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBt7rci-cosEmK9Q37bsfza8jXF7AhwMzAyDg676MDvg4mMmRuelXYOA6H9BumldPzIFV46DgQEPV83L_j3z5J0H5UIYx8r8USqf43Ak6AG_Z_V04ouVqf3gmGnkDYm_NzF3zJ4pfaP_auDjKkV4avWh3jK8MarlHTftgClCOEzmPIyYck-ohdkTUgg3G6NJb2soG9tZWSR-3HAJBhYAldELLR1_litGXoUGydYshDJ2mh3ur6sNQZmLw7UFIHtPfjsc7PXIR0vokaL" },
    { id: 28, nome: "Bock Escura Intensa", categoria: "cerveja", label: "CERVEJA", preco: 28.50, tag: "Novo", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFtMhn37Sv8TaPXGAhuMzMIp6_4-MkBkKcvkaqfdHy0DkjB03tS_fPKcWa7K6lChBqxPzffsea3ACg-mi-1H-X606L70nrA3Wqs9UjrSkx-SJ7cYrPTRa5YBYYD9hnmCQkD8Xsug8HJTXcT-OuYJpJhv62qzBtsapL3MzrldkRfGNHE5lXp06vTihHx_UF2vILgQQMcTaBOZGmva0J20GShyUxF8dWQCk7nN8uweb7JBi9t2e6Je57asv5VwE6gy4MAtqclNFBMMke" },
    { id: 29, nome: "Session IPA Leve", categoria: "cerveja", label: "CERVEJA", preco: 19.90, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_zBhMmoVQyhdFTGbsV-odjcE63JL3SX610jrCeDv7lo8kBpC8JwZHqt-g9uQX4-c3JSiIkIwNO6Yh4IlDWXwT7Y1Ry2PTN790typ6armmc8pXXcJAn4urSVaS3FFV7O_V3gZ7qE43ov9A949ddnfJbltbesATNXsx3FHGut-HC4-A7KzUMIxZgRPnSy0BuxfHS2mgbWTD6D7gfvU_Qlc_naQixLkSycO-8evNvP0SLe5MtcEwqIntDNOOdIXi4acXyL-flJB9YUzR" },

    // Sem Álcool 
    { id: 16, nome: "Água Botânica Orgânica com Gás", categoria: "sem-alcool", label: "SEM ÁLCOOL", preco: 8.50, tag: "Mais Vendido", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_uLFTzD2s9CTzpg52R9mN79Vq7vEkq4iDlymrAyI-cec3mw34rzaahDXxp3HHw401jnPNrXg3gTxm83R0tJhIHLWF4A0z-Sq5NMmwTP1sCd4AAJdwuvNsJAwuZre_NRGuZ7mjAkZMmGmlDL18EZfcVXnzj-cKq55VWdgSTU5WpUdUv8EGd8Dx2pBizuxhHA4QyoJ6UxtvofPGzd7FO7OLzeh2VwYIxb2TURG9zrP9P5iP7k9a0M5YYaHXJQdUYY9BuJ64N2r31uYW" },
    { id: 17, nome: "Suco de Uva Integral", categoria: "sem-alcool", label: "SEM ÁLCOOL", preco: 16.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_uLFTzD2s9CTzpg52R9mN79Vq7vEkq4iDlymrAyI-cec3mw34rzaahDXxp3HHw401jnPNrXg3gTxm83R0tJhIHLWF4A0z-Sq5NMmwTP1sCd4AAJdwuvNsJAwuZre_NRGuZ7mjAkZMmGmlDL18EZfcVXnzj-cKq55VWdgSTU5WpUdUv8EGd8Dx2pBizuxhHA4QyoJ6UxtvofPGzd7FO7OLzeh2VwYIxb2TURG9zrP9P5iP7k9a0M5YYaHXJQdUYY9BuJ64N2r31uYW" },
    { id: 18, nome: "Soda Artesanal de Gengibre", categoria: "sem-alcool", label: "SEM ÁLCOOL", preco: 12.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_uLFTzD2s9CTzpg52R9mN79Vq7vEkq4iDlymrAyI-cec3mw34rzaahDXxp3HHw401jnPNrXg3gTxm83R0tJhIHLWF4A0z-Sq5NMmwTP1sCd4AAJdwuvNsJAwuZre_NRGuZ7mjAkZMmGmlDL18EZfcVXnzj-cKq55VWdgSTU5WpUdUv8EGd8Dx2pBizuxhHA4QyoJ6UxtvofPGzd7FO7OLzeh2VwYIxb2TURG9zrP9P5iP7k9a0M5YYaHXJQdUYY9BuJ64N2r31uYW" },
    { id: 19, nome: "Kombucha de Frutas Naturais", categoria: "sem-alcool", label: "SEM ÁLCOOL", preco: 18.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_uLFTzD2s9CTzpg52R9mN79Vq7vEkq4iDlymrAyI-cec3mw34rzaahDXxp3HHw401jnPNrXg3gTxm83R0tJhIHLWF4A0z-Sq5NMmwTP1sCd4AAJdwuvNsJAwuZre_NRGuZ7mjAkZMmGmlDL18EZfcVXnzj-cKq55VWdgSTU5WpUdUv8EGd8Dx2pBizuxhHA4QyoJ6UxtvofPGzd7FO7OLzeh2VwYIxb2TURG9zrP9P5iP7k9a0M5YYaHXJQdUYY9BuJ64N2r31uYW" },
    { id: 20, nome: "Cerveja Zero Álcool", categoria: "sem-alcool", label: "SEM ÁLCOOL", preco: 15.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFtMhn37Sv8TaPXGAhuMzMIp6_4-MkBkKcvkaqfdHy0DkjB03tS_fPKcWa7K6lChBqxPzffsea3ACg-mi-1H-X606L70nrA3Wqs9UjrSkx-SJ7cYrPTRa5YBYYD9hnmCQkD8Xsug8HJTXcT-OuYJpJhv62qzBtsapL3MzrldkRfGNHE5lXp06vTihHx_UF2vILgQQMcTaBOZGmva0J20GShyUxF8dWQCk7nN8uweb7JBi9t2e6Je57asv5VwE6gy4MAtqclNFBMMke" },
    { id: 30, nome: "Água Tônica Artesanal", categoria: "sem-alcool", label: "SEM ÁLCOOL", preco: 9.90, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_uLFTzD2s9CTzpg52R9mN79Vq7vEkq4iDlymrAyI-cec3mw34rzaahDXxp3HHw401jnPNrXg3gTxm83R0tJhIHLWF4A0z-Sq5NMmwTP1sCd4AAJdwuvNsJAwuZre_NRGuZ7mjAkZMmGmlDL18EZfcVXnzj-cKq55VWdgSTU5WpUdUv8EGd8Dx2pBizuxhHA4QyoJ6UxtvofPGzd7FO7OLzeh2VwYIxb2TURG9zrP9P5iP7k9a0M5YYaHXJQdUYY9BuJ64N2r31uYW" },
    { id: 31, nome: "Chá Gelado de Pêssego", categoria: "sem-alcool", label: "SEM ÁLCOOL", preco: 11.50, tag: "Promoção", precoAntigo: 15.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_uLFTzD2s9CTzpg52R9mN79Vq7vEkq4iDlymrAyI-cec3mw34rzaahDXxp3HHw401jnPNrXg3gTxm83R0tJhIHLWF4A0z-Sq5NMmwTP1sCd4AAJdwuvNsJAwuZre_NRGuZ7mjAkZMmGmlDL18EZfcVXnzj-cKq55VWdgSTU5WpUdUv8EGd8Dx2pBizuxhHA4QyoJ6UxtvofPGzd7FO7OLzeh2VwYIxb2TURG9zrP9P5iP7k9a0M5YYaHXJQdUYY9BuJ64N2r31uYW" },
    { id: 32, nome: "Mocktail de Frutas Vermelhas", categoria: "sem-alcool", label: "SEM ÁLCOOL", preco: 22.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_uLFTzD2s9CTzpg52R9mN79Vq7vEkq4iDlymrAyI-cec3mw34rzaahDXxp3HHw401jnPNrXg3gTxm83R0tJhIHLWF4A0z-Sq5NMmwTP1sCd4AAJdwuvNsJAwuZre_NRGuZ7mjAkZMmGmlDL18EZfcVXnzj-cKq55VWdgSTU5WpUdUv8EGd8Dx2pBizuxhHA4QyoJ6UxtvofPGzd7FO7OLzeh2VwYIxb2TURG9zrP9P5iP7k9a0M5YYaHXJQdUYY9BuJ64N2r31uYW" }
];

// ==========================================
// 3. LÓGICA DO CARRINHO (CRUD) E ABA LATERAL
// ==========================================
let carrinho = JSON.parse(localStorage.getItem('carrinhoBevShop')) || [];

function salvarCarrinho() {
    localStorage.setItem('carrinhoBevShop', JSON.stringify(carrinho));
    atualizarContadorCarrinho();
    renderizarCarrinhoLateral();
    renderizarCheckout();
}

window.adicionarAoCarrinho = function(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    const itemExistente = carrinho.find(item => item.id === id);
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }
    salvarCarrinho();
    abrirCarrinhoLateral();
};

window.alterarQuantidade = function(id, delta) {
    const item = carrinho.find(item => item.id === id);
    if (item) {
        item.quantidade += delta;
        if (item.quantidade <= 0) removerDoCarrinho(id);
        else salvarCarrinho();
    }
};

window.removerDoCarrinho = function(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    salvarCarrinho();
};

function atualizarContadorCarrinho() {
    const contadores = document.querySelectorAll('.cart-counter');
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    contadores.forEach(contador => {
        contador.textContent = totalItens;
        contador.style.display = totalItens > 0 ? 'flex' : 'none'; 
    });
}

// Funções da Gaveta Lateral
window.abrirCarrinhoLateral = function() {
    const overlay = document.getElementById('cart-overlay');
    const sidebar = document.getElementById('cart-sidebar');
    if (overlay && sidebar) {
        overlay.classList.remove('hidden');
        setTimeout(() => {
            overlay.classList.remove('opacity-0');
            sidebar.classList.remove('translate-x-full');
        }, 10);
    }
    renderizarCarrinhoLateral();
};

window.fecharCarrinhoLateral = function() {
    const overlay = document.getElementById('cart-overlay');
    const sidebar = document.getElementById('cart-sidebar');
    if (overlay && sidebar) {
        overlay.classList.add('opacity-0');
        sidebar.classList.add('translate-x-full');
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 300);
    }
};

window.renderizarCarrinhoLateral = function() {
    const containerItens = document.getElementById('cart-sidebar-items');
    const subtotalEl = document.getElementById('cart-sidebar-subtotal');
    if (!containerItens) return;

    if (carrinho.length === 0) {
        containerItens.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-slate-400 gap-3">
                <span class="material-symbols-outlined text-5xl">remove_shopping_cart</span>
                <p>Seu carrinho está vazio.</p>
            </div>`;
        if (subtotalEl) subtotalEl.textContent = 'R$ 0,00';
        return;
    }

    let subtotal = 0;
    containerItens.innerHTML = carrinho.map(item => {
        subtotal += item.preco * item.quantidade;
        return `
            <div class="flex gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div class="h-20 w-16 rounded-md bg-slate-100 dark:bg-slate-800 bg-cover bg-center flex-shrink-0" style="background-image: url('${item.img}')"></div>
                <div class="flex flex-col flex-1 justify-between">
                    <div class="flex justify-between items-start">
                        <h4 class="font-bold text-sm text-slate-900 dark:text-slate-100 leading-tight line-clamp-2 pr-4">${item.nome}</h4>
                        <button onclick="removerDoCarrinho(${item.id})" class="text-slate-400 hover:text-red-500 transition-colors">
                            <span class="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                    </div>
                    <div class="flex items-center justify-between mt-2">
                        <div class="flex items-center border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900">
                            <button onclick="alterarQuantidade(${item.id}, -1)" class="w-7 h-7 flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-l transition-colors">-</button>
                            <span class="w-6 text-center text-xs font-bold text-slate-900 dark:text-white">${item.quantidade}</span>
                            <button onclick="alterarQuantidade(${item.id}, 1)" class="w-7 h-7 flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-r transition-colors">+</button>
                        </div>
                        <span class="font-bold text-primary text-sm">R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    if (subtotalEl) {
        subtotalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    }
};

// ==========================================
// 4. RENDERIZAÇÃO DA TELA DE PAGAMENTO
// ==========================================
function renderizarCheckout() {
    const containerItens = document.getElementById('carrinho-itens');
    if (!containerItens) return;

    const subtotalEl = document.getElementById('carrinho-subtotal');
    const totalEl = document.getElementById('carrinho-total');
    const freteEl = document.getElementById('carrinho-frete');
    const btnFinalizar = document.getElementById('btn-finalizar');

    if (carrinho.length === 0) {
        containerItens.innerHTML = '<p class="text-slate-500 dark:text-slate-400 text-center py-6">Seu carrinho está vazio.</p>';
        subtotalEl.textContent = 'R$ 0,00';
        freteEl.textContent = 'R$ 0,00';
        totalEl.textContent = 'R$ 0,00';
        btnFinalizar.disabled = true;
        btnFinalizar.classList.add('opacity-50', 'cursor-not-allowed');
        return;
    }

    btnFinalizar.disabled = false;
    btnFinalizar.classList.remove('opacity-50', 'cursor-not-allowed');

    let subtotal = 0;
    containerItens.innerHTML = carrinho.map(item => {
        subtotal += item.preco * item.quantidade;
        return `
            <div class="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                <div class="h-16 w-16 rounded bg-slate-200 dark:bg-slate-800 bg-cover bg-center flex-shrink-0" style="background-image: url('${item.img}')"></div>
                <div class="flex-1 min-w-0">
                    <h4 class="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">${item.nome}</h4>
                    <p class="text-primary font-semibold text-sm">R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
                </div>
                <div class="flex flex-col items-end gap-2">
                    <button onclick="removerDoCarrinho(${item.id})" class="text-slate-400 hover:text-red-500 transition-colors">
                        <span class="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                    <div class="flex items-center border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900">
                        <button onclick="alterarQuantidade(${item.id}, -1)" class="w-6 h-6 flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-l">-</button>
                        <span class="w-6 text-center text-xs font-bold text-slate-900 dark:text-white">${item.quantidade}</span>
                        <button onclick="alterarQuantidade(${item.id}, 1)" class="w-6 h-6 flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-r">+</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    const frete = 12.50; 
    subtotalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    freteEl.textContent = `R$ ${frete.toFixed(2).replace('.', ',')}`;
    totalEl.textContent = `R$ ${(subtotal + frete).toFixed(2).replace('.', ',')}`;
}

// ==========================================
// 5. INICIALIZAÇÃO E LISTAGEM DE PRODUTOS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o carrinho em todas as páginas
    atualizarContadorCarrinho();
    renderizarCheckout();
    renderizarCarrinhoLateral();

    // Lógica da grade de produtos (só roda se estiver na produtos.html)
    const gridContainer = document.getElementById('product-grid');
    if (!gridContainer) return;

    const filterCheckboxes = document.querySelectorAll('.filter-category');
    const productCountText = document.getElementById('product-count');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const sortSelect = document.getElementById('sort-select');

    function renderizarProdutos() {
        const categoriasAtivas = Array.from(filterCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
        const minPrice = parseFloat(minPriceInput?.value) || 0;
        const maxPrice = maxPriceInput?.value ? parseFloat(maxPriceInput.value) : Infinity;

        let produtosFiltrados = produtos.filter(produto => {
            const matchCategoria = categoriasAtivas.includes(produto.categoria);
            const matchPreco = produto.preco >= minPrice && produto.preco <= maxPrice;
            return matchCategoria && matchPreco;
        });

        if (sortSelect) {
            if (sortSelect.value === "menor") produtosFiltrados.sort((a, b) => a.preco - b.preco);
            if (sortSelect.value === "maior") produtosFiltrados.sort((a, b) => b.preco - a.preco);
        }

        if (productCountText) {
            productCountText.textContent = `Mostrando ${produtosFiltrados.length} de ${produtos.length} produtos`;
        }

        if (produtosFiltrados.length === 0) {
            gridContainer.innerHTML = `<div class="col-span-full py-10 text-center text-slate-500"><span class="material-symbols-outlined text-4xl mb-2">sentiment_dissatisfied</span><p>Nenhum produto encontrado.</p></div>`;
            return;
        }

        gridContainer.innerHTML = produtosFiltrados.map(p => `
            <div class="group flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div class="relative aspect-[4/5] bg-slate-50 dark:bg-slate-800 p-4 flex items-center justify-center">
                    <img alt="${p.nome}" class="h-full object-contain group-hover:scale-105 transition-transform duration-500" src="${p.img}" />
                    ${p.tag ? `<span class="absolute top-3 left-3 ${p.tag === 'Promoção' ? 'bg-red-500' : 'bg-primary'} text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">${p.tag}</span>` : ''}
                </div>
                <div class="p-5 flex flex-col grow">
                    <div class="text-xs font-semibold text-primary mb-1">${p.label}</div>
                    <h3 class="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-1 line-clamp-2">${p.nome}</h3>
                    <div class="mt-auto flex items-center justify-between pt-4">
                        <div class="flex flex-col">
                            ${p.precoAntigo ? `<span class="text-sm text-slate-400 line-through">R$ ${p.precoAntigo.toFixed(2).replace('.', ',')}</span>` : ''}
                            <span class="font-bold text-xl text-slate-900 dark:text-white">R$ ${p.preco.toFixed(2).replace('.', ',')}</span>
                        </div>
                        <button onclick="adicionarAoCarrinho(${p.id})" class="bg-primary hover:bg-primary/90 text-white rounded-lg h-10 w-10 flex items-center justify-center transition-colors shadow-sm"><span class="material-symbols-outlined">add_shopping_cart</span></button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    filterCheckboxes.forEach(cb => cb.addEventListener('change', renderizarProdutos));
    if (minPriceInput) minPriceInput.addEventListener('input', renderizarProdutos);
    if (maxPriceInput) maxPriceInput.addEventListener('input', renderizarProdutos);
    if (sortSelect) sortSelect.addEventListener('change', renderizarProdutos);

    renderizarProdutos();
});