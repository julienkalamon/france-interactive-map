import csv
import json

def csv_to_json(csv_file_path, json_file_path):
    data = []
    with open(csv_file_path, 'r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file, delimiter=';')
        for row in csv_reader:
            # Nettoyer les données
            clean_row = {k: v.strip() if v else None for k, v in row.items()}
            
            # Convertir les coordonnées en nombres flottants
            if clean_row['lat'] and clean_row['lon']:
                clean_row['lat'] = float(clean_row['lat'])
                clean_row['lon'] = float(clean_row['lon'])
            else:
                clean_row['lat'] = None
                clean_row['lon'] = None
            
            # Convertir le nombre d'établissements en entier
            if clean_row['original_Nombre ETB actif']:
                clean_row['original_Nombre ETB actif'] = int(clean_row['original_Nombre ETB actif'])
            
            data.append(clean_row)

    with open(json_file_path, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, ensure_ascii=False, indent=2)

    print(f"Conversion terminée. Les données ont été sauvegardées dans {json_file_path}")

# Utilisation du script
csv_to_json('geocoded.csv', 'geocoded_data.json')