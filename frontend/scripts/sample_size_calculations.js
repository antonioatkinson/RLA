export function calculate_bravo_sample_size(num_ballots, risk_limit, v_w, v_l) {
    let asn = 0;

    if (v_w > v_l) {
        try {
            const s_w = v_w / (v_w + v_l);

            const z_w = Math.log(2.0 * s_w);
            const z_l = 2.0 * (1 - s_w) > 0 ? Math.log(2.0 * (1 - s_w)) : 0;

            const n_wl = v_w + v_l;

            const p_w = v_w / n_wl;
            const p_l = v_l / n_wl;

            const p = n_wl / num_ballots;

            asn = Math.ceil((Math.log(1.0 / risk_limit) + (z_w / 2.0)) / (p * ((p_w * z_w) + (p_l * z_l))));
        }
        catch (e) {
            asn = 0;
            console.log("Sample size could not be calculated due to an error:", e);
        }
    }
    return asn
}