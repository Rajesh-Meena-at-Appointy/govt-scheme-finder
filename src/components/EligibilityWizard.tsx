"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, User, Calendar, DollarSign, Search, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const STATES = [
  { value: "rajasthan", label: "Rajasthan" },
  { value: "madhya-pradesh", label: "Madhya Pradesh" },
  { value: "gujarat", label: "Gujarat" },
  { value: "delhi", label: "Delhi" },
  { value: "uttar-pradesh", label: "Uttar Pradesh" },
  { value: "maharashtra", label: "Maharashtra" },
  { value: "karnataka", label: "Karnataka" },
  { value: "tamil-nadu", label: "Tamil Nadu" },
];

const CATEGORIES = [
  { value: "farmer", label: "Farmer" },
  { value: "student", label: "Student" },
  { value: "health", label: "Health" },
  { value: "women", label: "Women" },
  { value: "senior", label: "Senior Citizen" },
  { value: "jobs", label: "Employment" },
  { value: "other", label: "Other" },
];

export default function EligibilityWizard() {
  const router = useRouter();
  const { t } = useI18n();
  const [state, setState] = useState("rajasthan");
  const [category, setCategory] = useState("farmer");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [age, setAge] = useState(25);
  const [income, setIncome] = useState(200000);

  const canSearch = useMemo(
    () => !!state && !!category && Number.isFinite(age) && age >= 0 && Number.isFinite(income) && income >= 0,
    [state, category, age, income]
  );

  const handleSearch = () => {
    const qs = new URLSearchParams({
      state,
      category,
      gender,
      age: String(age),
      income: String(income),
    });
    router.push(`/results?${qs.toString()}`);
  };

  return (
    <Card className="shadow-2xl border-0 overflow-hidden">
      {/* Gradient top border */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>

      <CardHeader className="bg-gradient-to-br from-slate-50 to-white pb-4 md:pb-6">
        <CardTitle className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2 md:gap-3">
          <div className="p-1.5 md:p-2 bg-blue-100 rounded-lg md:rounded-xl">
            <Search className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
          </div>
          <span>{t.wizard.title}</span>
        </CardTitle>
        <p className="text-sm md:text-base text-slate-600 mt-1 md:mt-2">
          {t.wizard.subtitle}
        </p>
      </CardHeader>

      <CardContent className="pt-4 md:pt-6 bg-white">
        <div className="space-y-4 md:space-y-6">
          {/* State & Category Row - Stack on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="space-y-1.5 md:space-y-2">
              <Label htmlFor="wizard-state" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                {t.wizard.state}
              </Label>
              <Select
                id="wizard-state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full h-12 md:h-12 border-2 border-slate-200 focus:border-blue-500 rounded-xl text-base"
              >
                {STATES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <Label htmlFor="wizard-category" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-blue-500" />
                {t.wizard.category}
              </Label>
              <Select
                id="wizard-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-12 md:h-12 border-2 border-slate-200 focus:border-blue-500 rounded-xl text-base"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {/* Personal Details Row - Stack on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <div className="space-y-1.5 md:space-y-2">
              <Label htmlFor="wizard-gender" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <User className="h-4 w-4 text-blue-500" />
                {t.wizard.gender}
              </Label>
              <Select
                id="wizard-gender"
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full h-12 md:h-12 border-2 border-slate-200 focus:border-blue-500 rounded-xl text-base"
              >
                <option value="male">{t.wizard.genders.male}</option>
                <option value="female">{t.wizard.genders.female}</option>
                <option value="other">{t.wizard.genders.other}</option>
              </Select>
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <Label htmlFor="wizard-age" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-500" />
                {t.wizard.age}
              </Label>
              <Input
                id="wizard-age"
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                min="0"
                max="120"
                className="w-full h-12 md:h-12 border-2 border-slate-200 focus:border-blue-500 rounded-xl text-base"
                placeholder="Age"
              />
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <Label htmlFor="wizard-income" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-blue-500" />
                {t.wizard.income}
              </Label>
              <Input
                id="wizard-income"
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                min="0"
                className="w-full h-12 md:h-12 border-2 border-slate-200 focus:border-blue-500 rounded-xl text-base"
                placeholder="₹ Income"
              />
            </div>
          </div>

          {/* Search Button */}
          <Button
            size="lg"
            disabled={!canSearch}
            onClick={handleSearch}
            className="w-full h-12 md:h-14 text-base md:text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
            aria-label={t.wizard.findSchemes}
          >
            <Search className="h-5 w-5 md:h-5 md:w-5 mr-2" aria-hidden="true" />
            <span className="hidden sm:inline">{t.wizard.findSchemes}</span>
            <span className="sm:hidden">{t.wizard.findSchemes}</span>
            <ArrowRight className="h-5 w-5 md:h-5 md:w-5 ml-2" aria-hidden="true" />
          </Button>

          {/* Disclaimer */}
          <p className="text-xs text-slate-500 text-center bg-slate-50 p-2 md:p-3 rounded-lg leading-relaxed">
            <strong>Disclaimer:</strong> {t.wizard.disclaimer}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
