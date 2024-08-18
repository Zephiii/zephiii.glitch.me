function setAvailableTanks() {
	if (makeEntityType == "shape") {
		document.getElementById("text1").innerHTML = "Size:"
		document.getElementById("text4").innerHTML = "Shape:"
		document.getElementById("classInput").innerHTML = '</optgroup><optgroup label="Shapes"><option value="square">Square</option><option value="triangleS">Triangle</option><option value="pentagon">Pentagon</option><option value="bpentagon">Beta Pentagon</option><option value="apentagon">Alpha Pentagon</option><option value="hexagon">Hexagon</option></optgroup><optgroup label="Ammunition"><option value="drone">Drone</option><option value="square">Necro Drone</option><option value="bullet">Bullet</option><option value="trap">Trap</option>'
	} else {
		document.getElementById("text1").innerHTML = "Level:"
		document.getElementById("text4").innerHTML = "Class:" // <option value="auto3">Auto 3 (Not Available)</option><option value="auto5">Auto 5 (Not Available)</option>
		document.getElementById("classInput").innerHTML = '</optgroup><optgroup label="Basic and Upgrades"><option value="basic">Basic</option><option value="twin">Twin</option><option value="sniper">Sniper</option><option value="machine">Machine Gun</option><option value="flank">Flank Guard</option><option value="director">Director</option><option value="pounder">Pounder</option><option value="trapper">Trapper</option><option value="smasher">Smasher</option></optgroup><optgroup label="Twin Upgrades"><option value="doubleTwin">Double Twin</option><option value="triple">Triple Shot</option><option value="spread">Spreadshot</option><option value="triplet">Triplet</option><option value="penta">Penta Shot</option><option value="tripletwin">Triple Twin</option><option value="autoDouble">Auto-Double</option></optgroup><optgroup label="Machine Gun Upgrades"><option value="sprayer">Sprayer</option><option value="destroyer">Destroyer</option><option value="hybrid">Hybrid</option><option value="annihilator">Annihilator</option><option value="gunner">Gunner</option></optgroup><optgroup label="Flank Guard Upgrades"><option value="hexa">Hexa Tank</option><option value="octo">Octo Tank</option><option value="triangle">Tri-Angle</option><option value="fighter">Fighter</option><option value="booster">Booster</option><option value="autoTriAngle">Auto-Tri-Angle</option></optgroup><optgroup label="Sniper Upgrades"><option value="assassin">Assassin</option><option value="hunter">Hunter</option><option value="predator">Predator</option><option value="tritrapper">Tri-Trapper</option><option value="autotrapper">Auto-Trapper</option><option value="megatrapper">Mega-Trapper</option></optgroup><optgroup label="Director Upgrades"><option value="overseer">Overseer</option><option value="overlord">Overlord</option><option value="master">Commander</option><option value="manager">Manager</option><option value="underseer">Underseer</option><option value="necromancer">Necromancer</option><option value="maleficitor">Maleficitor</option></optgroup><optgroup label="Smasher Upgrades"><option value="spike">Spike</option><option value="landmine">Landmine</option><option value="autosmasher">Auto-Smasher</option></optgroup><optgroup label="Multiple Tree Tanks"><option value="autogunner">Auto-Gunner</option><option value="overtrapper">Overtrapper</option><option value="gunnertrapper">Gunner Trapper</option><option value="minigun">Minigun</option><option value="streamliner">Streamliner</option><option value="cropDuster">Crop Duster</option></optgroup><optgroup label="Special"><option value="ac">Arena Closer</option><option value="dom">Destroyer Dominator</option><option value="ms">Mothership</option></optgroup><optgroup label="Bosses"><option value="summoner">Summoner</option></optgroup><optgroup label="Misc"><option value="turret">Auto Turret</option><option value="minion">Minion</option><option value="custom">Custom FTB Tank</option>'	}
}

function convertFTB(FTBi) {
	Out = new Array(FTBi.length)

	//Loop through all barrels.
	for (var i=0;i<FTBi.length;i++) {
		FTB = FTBi[i]
		//Convert Types
		if (FTB["type"] == 0) {
			FTB["type"] = 0
			//Resize Barrels
			FTB["length"] = FTB["length"] * 9/13
			FTB["width"] = FTB["width"] * 0.76
		} else if (FTB["type"] == 1) {
			FTB["type"] = 2
			//Resize Barrels
			FTB["length"] = FTB["length"] * 0.9
			FTB["width"] = FTB["width"] * 1.6
		} else if (FTB["type"] == 2) {
			FTB["type"] = 1
			//Resize Barrels
			FTB["length"] = FTB["length"] * 68/130
			FTB["width"] = FTB["width"] * 0.8
		} else if (FTB["type"] == 3) {
			FTB["type"] = 1
			//Resize Barrels
			FTB["length"] = FTB["length"] * 68/130
			FTB["width"] = FTB["width"] * 0.8
		}
		

		Out[i] = {"barrelType":FTB["type"],"length":FTB["length"],"width":FTB["width"],"angle":FTB["angle"],"offsetX":FTB["xoffset"],"damage":"1","penetration":"1"}
	}
	return Out
}
