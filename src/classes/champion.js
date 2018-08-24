export default class Champion {
	constructor(data) {
		Object.keys(data).forEach(key => {
			this[key] = data[key];
		});
	}
	get_image() {
		return `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${this.id}_0.jpg`
	}
	heroIcon() {
		const url = `http://ddragon.leagueoflegends.com/cdn/${this.version}/img/champion/`;
		return url + this.image.full;
	}
	get_skins(type = 'splash') {
		// tiles, loading, splash
		const url = `http://ddragon.leagueoflegends.com/cdn/img/champion/${type}/`;
		return this.skins.map(skin => (
			{
				...skin,
				url: url + this.id + '_' + skin.num + '.jpg'
			}
		));
	}
	get_spells() {
		//  Some hero informations are bugged like braum , aatrox etc. values are diffirent will look further
		const url = `http://ddragon.leagueoflegends.com/cdn/${this.version}/img/spell/`;
		return this.spells.map(({ tooltip, effectBurn, vars, image, ...rest }) => {
			const spellReplaces = [...effectBurn, ...vars].reduce((prev, current, index) => {
				const key = current === null ? { [`e${index}`]: null } : (typeof current === 'string' ? { [`e${index}`]: current } : {
					[current.key]: current.coeff * 100.00 + (current.link.indexOf('spell') > -1 ? '% Spell Damage' : '% Attack Damage')
				});
				return ({
					...prev,
					...key
				});
			}, {});
			// let cleanTooltip = tooltip.replace(/<(?:.|\n)*?>/gm, '');
			let cleanTooltip = tooltip;
			Object.keys(spellReplaces).forEach((spellburn) => {
				cleanTooltip = cleanTooltip.replace(`{{ ${spellburn} }}`, spellReplaces[spellburn]);
			});
			return ({
				...rest,
				effectBurn, vars,
				tooltip: cleanTooltip,
				image: url + image.full
			});
		});
	}
}