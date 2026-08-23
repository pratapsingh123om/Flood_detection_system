from services.ward_service import calculate_ward_flood_risks

print("="*80)
print("TESTING 85-WARD FLOOD RISKS UNDER EXTREME CLOUDBURST SCENARIO (85mm Rainfall)")
print("="*80)

risks = calculate_ward_flood_risks(predicted_rainfall_mm=85.0, runoff_coeff=0.65, drainage_eff=0.40)

high_count = sum(1 for w in risks if w.risk_level == "HIGH")
mod_count = sum(1 for w in risks if w.risk_level == "MODERATE")
low_count = sum(1 for w in risks if w.risk_level == "LOW")

print(f"Total Wards Evaluated: {len(risks)}")
print(f"HIGH Risk Wards: {high_count}")
print(f"MODERATE Risk Wards: {mod_count}")
print(f"LOW Risk Wards: {low_count}")

print("\nSAMPLE HIGH RISK WARDS:")
for w in [r for r in risks if r.risk_level == "HIGH"][:5]:
    print(f"   - Ward {w.ward_id} ({w.ward_name}): Rain={w.predicted_rain_mm}mm, Runoff={w.runoff_mm}mm, Waterlogging Depth={w.water_depth_cm}cm, Level={w.risk_level} ({w.color_hex})")

print("="*80)
